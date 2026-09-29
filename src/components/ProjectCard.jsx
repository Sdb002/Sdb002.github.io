import { repoUrl } from "../data.jsx";
import Gallery from "./Gallery.jsx";
import { revealClass, useReveal } from "./Reveal.jsx";

// Tracks the pointer so the card's ::after glow follows it (CSS shows it only on hover devices).
const trackGlow = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export default function ProjectCard({ p, idx, stars, delay = 0 }) {
  const [ref, shown] = useReveal();
  const cls = ["card", p.featured && "featured", p.wide && "wide", p.shots && "has-shots"].filter(Boolean).join(" ");
  const href = p.path ? `${repoUrl(p.repo)}/${p.path}` : repoUrl(p.repo);

  return (
    <article ref={ref} className={revealClass(shown, cls)} style={{ "--d": `${delay}ms` }} onPointerMove={trackGlow}>
      {p.shots && <Gallery shots={p.shots} label={p.title} ratio={p.ratio} />}
      <div className="card-body">
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
      </div>
    </article>
  );
}
