import { STACK } from "../data.jsx";

export default function Stack() {
  return (
    <section id="stack" className="section">
      <div className="wrap">
        <p className="eyebrow">~/stack</p>
        <div className="stack-grid">
          {STACK.map((g) => (
            <div className="cat" key={g.title}>
              <h3>{g.title}</h3>
              <div className="chips">
                {g.items.map((it) => (
                  <span className="chip" key={it}>{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
