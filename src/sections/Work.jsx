import LiveRepos from "../components/LiveRepos.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { GITHUB_USER, HIDDEN_REPOS, PROJECTS, REPO_SNAPSHOT } from "../data.jsx";
import { useGitHubRepos } from "../hooks/useGitHubRepos.js";

export default function Work() {
  const { repos, status } = useGitHubRepos(GITHUB_USER, REPO_SNAPSHOT);
  const stars = new Map(repos.map((r) => [r.name.toLowerCase(), r.stars]));
  const extras = repos.filter((r) => !r.fork && !HIDDEN_REPOS.has(r.name.toLowerCase()));

  return (
    <section id="work" className="section">
      <div className="wrap">
        <p className="eyebrow">~/work</p>
        <div className="work-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.title}
              p={p}
              idx={String(i + 1).padStart(2, "0")}
              stars={p.path ? 0 : stars.get(p.repo.toLowerCase())}
            />
          ))}
        </div>
        <LiveRepos repos={extras} total={repos.length} status={status} />
      </div>
    </section>
  );
}
