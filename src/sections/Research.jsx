import Gallery from "../components/Gallery.jsx";
import Reveal from "../components/Reveal.jsx";
import VideoPlayer from "../components/VideoPlayer.jsx";
import { THESIS, repoUrl } from "../data.jsx";

export default function Research() {
  return (
    <section id="research" className="section">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">~/research</Reveal>
        <Reveal className="research">
          <div className="research-grid">
            <div>
              <span className="kicker">undergraduate thesis · in progress · deployed</span>
              <h3>A Physician-Supervised, AI-Powered Diagnostic &amp; Personalized Health Recommendation System</h3>
              <p>
                The premise: <b>keep a clinician in the loop</b> while software handles intake, lab-report
                reading, and a personalized weekly diet and exercise plan built from Bangladeshi foods,
                recipes and cited exercise guidance. Doctors review every plan, patients see only what
                their doctor approved, and an admin approves the doctors.
              </p>
              <p>
                Every medical decision comes from a <b>deterministic, cited rule engine</b>. Lab slips are
                read on the server by open-source OCR, gradient-boosted models re-rank only what the
                safety gate already allowed, and an LLM at most phrases the report for the doctor to
                approve. Three guarantees, each enforced by a test:
              </p>
            </div>
            <Gallery shots={THESIS.shots} label="Physician-supervised health system" />
          </div>
          <ul className="guarantees">
            {THESIS.guarantees.map((g, k) => (
              <Reveal as="li" key={g.k} delay={k * 110}>
                <span className="g-k">{g.k}</span>
                <span className="g-v">{g.v}</span>
              </Reveal>
            ))}
          </ul>
          <ul className="thesis-stats">
            {THESIS.stats.map((st, k) => (
              <Reveal as="li" key={st.k} delay={k * 110}>
                <span className="ts-k">{st.k}</span>
                <span className="ts-v">{st.v}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal className="research-video">
            <VideoPlayer
              id={THESIS.video.id}
              caption={THESIS.video.caption}
              title="A Physician-Supervised, AI-Powered Diagnostic & Personalized Health Recommendation System — demo"
            />
          </Reveal>
          <div className="card-foot">
            <div className="tags">
              {THESIS.tags.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
            <div className="card-links">
              <a className="repo demo" href={THESIS.demo} target="_blank" rel="noopener noreferrer">
                live demo ↗
              </a>
              <a className="repo" href={repoUrl(THESIS.repo)} target="_blank" rel="noopener noreferrer">
                <span>repo</span> {THESIS.repo} →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
