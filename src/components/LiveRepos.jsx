import { GITHUB_URL, LANG_COLORS } from "../data.jsx";
import Reveal from "./Reveal.jsx";

const STATUS_TEXT = {
  loading: "fetching from api.github.com…",
  live: "live from api.github.com",
  offline: "github api unreachable — showing a snapshot",
};

const monthYear = (iso) =>
  new Date(iso).toLocaleDateString("en", { month: "short", year: "numeric" });

export default function LiveRepos({ repos, total, status }) {
  return (
    <div className="more">
      <div className="more-head">
        <h3 className="more-title">more on github</h3>
        <span className={`more-status ${status}`} role="status">
          <span className="pulse" />{STATUS_TEXT[status]}
        </span>
      </div>

      {repos.length > 0 && (
        <div className="repo-grid">
          {repos.map((r, k) => (
            <Reveal as="a" delay={(k % 4) * 70} className="repo-card" key={r.name} href={r.url} target="_blank" rel="noopener noreferrer">
              <div className="rc-top">
                <span className="rc-name">{r.name}</span>
                <span className="arr" aria-hidden="true">↗</span>
              </div>
              <p className={r.description ? "rc-desc" : "rc-desc empty"}>
                {r.description || "No description yet."}
              </p>
              <div className="rc-meta">
                {r.language && (
                  <span>
                    <i className="lang-dot" style={{ background: LANG_COLORS[r.language] ?? "var(--text-faint)" }} />
                    {r.language}
                  </span>
                )}
                {r.stars > 0 && <span>★ {r.stars}</span>}
                {r.pushedAt && <span>updated {monthYear(r.pushedAt)}</span>}
              </div>
            </Reveal>
          ))}
        </div>
      )}

      <a className="btn btn-ghost more-all" href={`${GITHUB_URL}?tab=repositories`} target="_blank" rel="noopener noreferrer">
        all {total} repositories on GitHub <span className="arr">↗</span>
      </a>
    </div>
  );
}
