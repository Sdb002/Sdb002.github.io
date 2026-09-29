import { useEffect, useState } from "react";

// Unauthenticated GitHub API calls are limited to 60/hour per IP, so the
// result is cached for the tab session.
const CACHE_TTL = 10 * 60 * 1000;
const cacheKey = (user) => `gh-repos:${user}`;

function readCache(user) {
  try {
    const raw = sessionStorage.getItem(cacheKey(user));
    if (!raw) return null;
    const { at, repos } = JSON.parse(raw);
    return Date.now() - at < CACHE_TTL ? repos : null;
  } catch {
    return null;
  }
}

function writeCache(user, repos) {
  try {
    sessionStorage.setItem(cacheKey(user), JSON.stringify({ at: Date.now(), repos }));
  } catch {
    /* storage unavailable (private mode, blocked) — just skip caching */
  }
}

const slim = (r) => ({
  name: r.name,
  description: r.description,
  language: r.language,
  stars: r.stargazers_count,
  url: r.html_url,
  pushedAt: r.pushed_at,
  fork: r.fork,
});

/**
 * Public repos for `user`, newest push first.
 * status: "loading" → showing `snapshot` while fetching,
 *         "live"    → fresh from the API,
 *         "offline" → the fetch failed; still showing `snapshot`.
 */
export function useGitHubRepos(user, snapshot) {
  const [state, setState] = useState(() => {
    const cached = readCache(user);
    return cached ? { repos: cached, status: "live" } : { repos: snapshot, status: "loading" };
  });
  const needsFetch = state.status === "loading";

  useEffect(() => {
    if (!needsFetch) return;
    const ctrl = new AbortController();
    fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`, {
      signal: ctrl.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const repos = data.map(slim);
        writeCache(user, repos);
        setState({ repos, status: "live" });
      })
      .catch((err) => {
        if (err.name !== "AbortError") setState((s) => ({ ...s, status: "offline" }));
      });
    return () => ctrl.abort();
  }, [user, needsFetch]);

  return state;
}
