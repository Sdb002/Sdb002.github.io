import Oscilloscope from "../components/Oscilloscope.jsx";
import { GITHUB_URL, STATUS } from "../data.jsx";

export default function Hero() {
  return (
    <header id="top" className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">~/whoami</p>
            <h1>
              I build AI products<br />
              from the <span className="accent">parser up.</span>
            </h1>
            <p className="lede">
              Third-year CS student at Daffodil International University and freelance fullstack
              engineer. I work close to the machine — <b>Linux internals, hand-written parsers,
              FastAPI services wired to LLMs</b> — and I'm putting those instincts behind AI.
            </p>
            <div className="hero-actions">
              <a href="#work" className="btn btn-primary">See the work <span className="arr">↗</span></a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                github.com/Sdb002 <span className="arr">↗</span>
              </a>
            </div>
          </div>

          <aside className="panel" aria-label="Status">
            <div className="panel-bar">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span className="t">status — shuvro@dev</span>
            </div>
            <div className="panel-body">
              {STATUS.map((r) => (
                <div className="row" key={r.k}>
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
