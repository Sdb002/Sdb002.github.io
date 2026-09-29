import Oscilloscope from "../components/Oscilloscope.jsx";
import { GITHUB_URL, STATUS } from "../data.jsx";

// Entrance choreography is pure CSS: each `.rise` / `.line` / `.row` animates
// once on load, staggered by its --d / --i custom property.
export default function Hero() {
  return (
    <header id="top" className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <p className="eyebrow rise">~/whoami<span className="caret" aria-hidden="true" /></p>
            <h1>
              <span className="line" style={{ "--d": "120ms" }}><span>I build AI products</span></span>
              <span className="line" style={{ "--d": "240ms" }}>
                <span>from the <span className="accent">parser up.</span></span>
              </span>
            </h1>
            <p className="lede rise" style={{ "--d": "420ms" }}>
              Third-year CS student at Daffodil International University and freelance fullstack
              engineer. I work close to the machine — <b>Linux internals, hand-written parsers,
              FastAPI services wired to LLMs</b> — and I'm putting those instincts behind AI.
            </p>
            <div className="hero-actions rise" style={{ "--d": "540ms" }}>
              <a href="#work" className="btn btn-primary">See the work <span className="arr">↗</span></a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                github.com/Sdb002 <span className="arr">↗</span>
              </a>
            </div>
          </div>

          <aside className="panel panel-in" aria-label="Status">
            <div className="panel-bar">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span className="t">status — shuvro@dev</span>
            </div>
            <div className="panel-body">
              {STATUS.map((r, i) => (
                <div className="row" key={r.k} style={{ "--i": i }}>
                  <span className="k">{r.k}</span>
                  <span className={r.cls ? "v " + r.cls : "v"}>
                    {r.pulse && <span className="pulse" />}{r.v}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <Oscilloscope />
      </div>
    </header>
  );
}
