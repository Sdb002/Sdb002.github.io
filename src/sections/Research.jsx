import { THESIS, repoUrl } from "../data.jsx";

export default function Research() {
  return (
    <section id="research" className="section">
      <div className="wrap">
        <p className="eyebrow">~/research</p>
        <div className="research">
          <span className="kicker">undergraduate thesis · in progress</span>
          <h3>A Physician-Supervised, AI-Powered Diagnostic &amp; Personalized Health Recommendation System</h3>
          <p>
            The premise: <b>keep a clinician in the loop</b> while an AI handles intake,
            pattern-matching, and personalized recommendations grounded in real nutritional data.
            It pulls together the threads I care about — model integration, a real backend, and
            data I actually trust — into one system that has to be safe enough for a doctor to sign
            off on.
          </p>
          <p>
            Every medical decision comes from a <b>deterministic, cited rule engine</b>; the LLM only
            reads lab reports and phrases the final write-up. Three guarantees, each enforced by a test:
          </p>
          <ul className="guarantees">
            {THESIS.guarantees.map((g) => (
              <li key={g.k}>
                <span className="g-k">{g.k}</span>
                <span className="g-v">{g.v}</span>
              </li>
            ))}
          </ul>
          <div className="card-foot">
            <div className="tags">
              {THESIS.tags.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
            <a className="repo" href={repoUrl(THESIS.repo)} target="_blank" rel="noopener noreferrer">
              <span>repo</span> {THESIS.repo} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
