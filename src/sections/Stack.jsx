import Reveal from "../components/Reveal.jsx";
import { STACK } from "../data.jsx";

export default function Stack() {
  return (
    <section id="stack" className="section">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">~/stack</Reveal>
        <div className="stack-grid">
          {STACK.map((g, i) => (
            <Reveal className="cat" key={g.title} delay={(i % 3) * 90}>
              <h3>{g.title}</h3>
              <div className="chips">
                {g.items.map((it, k) => (
                  <span className="chip" key={it} style={{ "--i": k }}>{it}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
