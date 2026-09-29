export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <p className="eyebrow">~/about</p>
        <div className="about-grid">
          <p className="about-text">
            I learn by building things that are slightly too hard, then taking them further than
            the assignment asked for.
          </p>
          <div className="about-side">
            <p>
              Most of my work lives at the systems level: a C analyzer that parses source into an
              AST and estimates Big-O, a Linux process monitor that suspends and kills rogue
              processes on rules I write by hand.
            </p>
            <p>
              Lately I've been wiring that same instinct into AI — <b>FastAPI backends with
              streaming LLM endpoints</b>, service-layer architecture, and an undergraduate thesis
              on physician-supervised diagnostic systems. I build the whole thing: parser, backend,
              model integration, and the desktop or web surface on top.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
