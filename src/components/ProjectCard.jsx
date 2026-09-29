import { repoUrl } from "../data.jsx";

export default function ProjectCard({ p, idx, stars }) {
  const cls = ["card", p.featured && "featured", p.wide && "wide"].filter(Boolean).join(" ");
  const href = p.path ? `${repoUrl(p.repo)}/${p.path}` : repoUrl(p.repo);

  return (
    <article className={cls}>
      <div className="card-top">
        <div>
          <span className="idx">[{idx}]</span>
          {p.featured && <span className="flag">featured</span>}
          <h3>{p.title}</h3>
        </div>
        {p.meta && <span className="meta">{p.meta}</span>}
      </div>
      <p>{p.body}</p>
      <div className="card-foot">
        <div className="tags">
          {p.tags.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
        <div className="card-links">
          {stars > 0 && <span className="stars" title={`${stars} GitHub stars`}>★ {stars}</span>}
          {p.demo && (
            <a className="repo demo" href={p.demo} target="_blank" rel="noopener noreferrer">
              live demo ↗
            </a>
          )}
          <a className="repo" href={href} target="_blank" rel="noopener noreferrer">
            <span>repo</span> {p.linkLabel ?? p.repo} →
          </a>
        </div>
      </div>
    </article>
  );
}
