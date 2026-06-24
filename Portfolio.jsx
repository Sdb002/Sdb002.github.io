import { useRef, useEffect } from "react";

/* ----------------------------- content ----------------------------- */

const STATUS = [
  { k: "location", v: "Bangladesh" },
  { k: "role", v: "Fullstack AI · freelance" },
  { k: "studying", v: "CSE @ DIU · final year" },
  { k: "focus", v: "LLM backends + systems", cls: "live" },
  { k: "env", v: "Fedora / KDE Plasma" },
  { k: "editor", v: "PyCharm · Darcula" },
  { k: "status", v: "open to work", cls: "warn", pulse: true },
];

const STACK = [
  { title: "languages", items: ["Python", "C / C++", "Java", "JavaScript", "SQL"] },
  { title: "ai / llm", items: ["LLM endpoints", "LangChain", "SSE streaming", "service architecture"] },
  { title: "backend", items: ["FastAPI", "pydantic-settings", "REST", "SQLite", "MySQL"] },
  { title: "systems", items: ["Linux", "Docker", "psutil", "process mgmt", "parsers / AST"] },
  { title: "frontend / ui", items: ["React", "HTML / CSS", "PySide6", "DearPyGUI", "Java Swing"] },
  { title: "tooling", items: ["Git", "Fedora / KDE", "ReportLab", "data engineering"] },
];

const PROJECTS = [
  {
    idx: "01",
    featured: true,
    title: "ProcessGuard Pro",
    meta: "team lead · 5 people",
    tags: ["Python", "DearPyGUI", "psutil", "SQLite", "Docker", "FastAPI"],
    repo: { prefix: "repo", label: "ProcessGuard_Pro", url: "https://github.com/Sdb002/ProcessGuard_Pro" },
    body: (
      <>
        A Linux process manager that goes past monitoring. It watches every process, flags the rogue
        ones, and <b>suspends, resumes, or kills them against rules I define</b>. Desktop UI in
        DearPyGUI on top of psutil, SQLite for history, Docker for packaging. I led a five-person team
        and extended it with a <b>FastAPI + LLM endpoint</b> that explains what a suspicious process is
        actually doing.
      </>
    ),
  },
  {
    idx: "02",
    title: "C-Analyzer",
    meta: "compiler engineering",
    tags: ["Python", "PySide6", "Pratt parser", "AST", "ReportLab"],
    repo: { prefix: "repo", label: "C-Analyzer", url: "https://github.com/Sdb002/C-Analyzer" },
    body: (
      <>
        A C source analyzer with a <b>parser I wrote by hand</b> — no parser generator. It tokenizes,
        builds a live AST you can inspect, walks the symbol table, estimates Big-O complexity, and
        exports the full analysis to PDF. PySide6 desktop app.
      </>
    ),
  },
  {
    idx: "03",
    title: "WeatherApp",
    tags: ["Java", "Swing", "OpenWeatherMap"],
    repo: { label: "WeatherApp", url: "https://github.com/Sdb002/WeatherApp" },
    body: (
      <>
        Desktop weather client in Java Swing. Current conditions plus a five-day forecast, location
        search with autocomplete, dark/light themes, and <b>API failover</b> when the primary source
        drops.
      </>
    ),
  },
  {
    idx: "04",
    title: "Job-portal",
    tags: ["Java", "Swing", "MySQL"],
    repo: { label: "Job-portal", url: "https://github.com/Sdb002/Job-portal" },
    body: (
      <>
        A two-sided job portal — seekers and employers — with posting, browsing, and application
        management. Java Swing front end on a <b>MySQL backend with full CRUD</b>.
      </>
    ),
  },
  {
    idx: "05",
    title: "Bangladeshi Nutritional Dataset",
    meta: "data engineering",
    tags: ["Python", "data engineering", "Bengali script", "nutrition"],
    repo: { prefix: "profile", label: "Sdb002", url: "https://github.com/Sdb002" },
    body: (
      <>
        A dataset I built because it didn't exist: <b>250 Bangladeshi foods across 24 columns</b> — a
        full micronutrient panel, glycemic index values, and food names in Bengali script. It's the
        groundwork for the diagnostic recommendation system in my thesis.
      </>
    ),
  },
];

const CONTACT = [
  { k: "email", v: "shuvrodevbiswas02@gmail.com", url: "mailto:shuvrodevbiswas02@gmail.com" },
  { k: "github", v: "github.com/Sdb002", url: "https://github.com/Sdb002" },
  { k: "linkedin", v: "shuvro-dev-biswas", url: "https://www.linkedin.com/in/shuvro-dev-biswas-0797b6322/" },
  { k: "facebook", v: "ShuvroDev02", url: "https://www.facebook.com/ShuvroDev02/" },
];

/* --------------------------- oscilloscope --------------------------- */

function Oscilloscope() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;

    function resize() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function trace(t) {
      ctx.clearRect(0, 0, w, h);
      const mid = h * 0.62;

      ctx.strokeStyle = "rgba(34,43,54,0.9)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 46) {
        ctx.beginPath();
        ctx.moveTo(x, mid - 4);
        ctx.lineTo(x, mid + 4);
        ctx.stroke();
      }

      ctx.beginPath();
      for (let i = 0; i <= w; i += 2) {
        const p = i / w;
        const y =
          mid +
          Math.sin(p * 9 + t * 1.1) * 13 * Math.sin(p * Math.PI) +
          Math.sin(p * 23 - t * 1.7) * 4 +
          Math.sin(p * 51 + t * 0.6) * 2;
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.strokeStyle = "#EAB24E";
      ctx.lineWidth = 1.6;
      ctx.shadowColor = "rgba(234,178,78,0.5)";
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      const lp = (t * 0.12) % 1;
      const lx = lp * w;
      const ly =
        mid +
        Math.sin(lp * 9 + t * 1.1) * 13 * Math.sin(lp * Math.PI) +
        Math.sin(lp * 23 - t * 1.7) * 4 +
        Math.sin(lp * 51 + t * 0.6) * 2;
      ctx.beginPath();
      ctx.arc(lx, ly, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = "#F4C264";
      ctx.fill();
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduce) {
      trace(0.6);
      return () => window.removeEventListener("resize", resize);
    }

    const start = performance.now();
    const loop = (now) => {
      trace((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="scope" aria-hidden="true">
      <canvas ref={canvasRef} />
      <span className="scope-label">// signal — always monitoring</span>
    </div>
  );
}

/* ---------------------------- project card -------------------------- */

function ProjectCard({ p }) {
  return (
    <article className={p.featured ? "card featured" : "card"}>
      <div className="card-top">
        <div>
          <span className="idx">[{p.idx}]</span>
          {p.featured && <span className="flag">featured</span>}
          <h3 style={{ marginTop: p.featured ? "10px" : "8px" }}>{p.title}</h3>
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
        <a className="repo" href={p.repo.url} target="_blank" rel="noopener noreferrer">
          {p.repo.prefix && <span>{p.repo.prefix}</span>} {p.repo.label} →
        </a>
      </div>
    </article>
  );
}

/* ------------------------------- page ------------------------------- */

export default function Portfolio() {
  useEffect(() => {
    const id = "portfolio-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="portfolio-root">
      <style>{CSS}</style>

      <nav>
        <div className="nav-inner">
          <a href="#top" className="brand"><b>~/</b>shuvro</a>
          <div className="nav-links">
            <a href="#about">about</a>
            <a href="#stack">stack</a>
            <a href="#work">work</a>
            <a href="#research">research</a>
          </div>
          <div className="nav-actions">
            <a href="#contact" className="nav-ghost">contact</a>
            <a href="https://github.com/Sdb002" target="_blank" rel="noopener noreferrer" className="nav-cta">github ↗</a>
          </div>
        </div>
      </nav>

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
                <a href="https://github.com/Sdb002" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
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

      <main>
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

        <section id="work" className="section">
          <div className="wrap">
            <p className="eyebrow">~/work</p>
            <div className="work-list">
              <ProjectCard p={PROJECTS[0]} />
              <ProjectCard p={PROJECTS[1]} />
              <div className="work-pair">
                <ProjectCard p={PROJECTS[2]} />
                <ProjectCard p={PROJECTS[3]} />
              </div>
              <ProjectCard p={PROJECTS[4]} />
            </div>
          </div>
        </section>

        <section id="research" className="section">
          <div className="wrap">
            <p className="eyebrow">~/research</p>
            <div className="research">
              <span className="kicker">undergraduate thesis · in progress</span>
              <h3>A Physician-Supervised, AI-Powered Diagnostic & Personalized Health Recommendation System</h3>
              <p>
                The premise: <b>keep a clinician in the loop</b> while an AI handles intake,
                pattern-matching, and personalized recommendations grounded in real nutritional data.
                It pulls together the threads I care about — model integration, a real backend, and
                data I actually trust — into one system that has to be safe enough for a doctor to sign
                off on.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="foot-inner">
          <div className="foot-lead">
            <p className="eyebrow">~/contact</p>
            <div className="foot-name">Let's build<br />something<span className="accent">.</span></div>
            <p className="foot-sub">
              <b>Shuvro Dev Biswas</b><br />
              Fullstack AI engineer · open to freelance &amp; collaboration
            </p>
          </div>

          <aside className="panel contact-panel" aria-label="Contact">
            <div className="panel-bar">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span className="t">contact — say hello</span>
            </div>
            <div className="panel-body">
              {CONTACT.map((c) => {
                const ext = !c.url.startsWith("mailto");
                return (
                  <a
                    className="crow"
                    key={c.k}
                    href={c.url}
                    target={ext ? "_blank" : undefined}
                    rel={ext ? "noopener noreferrer" : undefined}
                  >
                    <span className="k">{c.k}</span>
                    <span className="cv">{c.v} →</span>
                  </a>
                );
              })}
            </div>
          </aside>
        </div>
        <div className="foot-base">built with react, css &amp; a canvas signature</div>
      </footer>
    </div>
  );
}

/* ------------------------------- styles ----------------------------- */

const CSS = `
:root{
  --ink:#0D1014; --ink-raised:#141A21; --ink-line:#222B36; --ink-line-soft:#1A222C;
  --text:#E7E2D8; --text-dim:#8B95A4; --text-faint:#5C6675;
  --amber:#EAB24E; --amber-deep:#C9913A; --cyan:#6FD0C4;
  --display:"Bricolage Grotesque", sans-serif;
  --body:"Inter", sans-serif;
  --mono:"JetBrains Mono", monospace;
  --maxw:1140px; --pad:clamp(20px, 5vw, 64px);
}
html,body{margin:0;}
body{background:#0D1014;}
.portfolio-root{
  background:var(--ink); color:var(--text); font-family:var(--body);
  font-size:17px; line-height:1.6; -webkit-font-smoothing:antialiased;
  min-height:100vh; overflow-x:hidden;
}
.portfolio-root *{box-sizing:border-box;}
.portfolio-root ::selection{background:var(--amber);color:var(--ink);}
.portfolio-root a{color:inherit;text-decoration:none;}
.portfolio-root a:focus-visible,.portfolio-root button:focus-visible{outline:2px solid var(--amber);outline-offset:3px;border-radius:2px;}

.wrap{max-width:var(--maxw);margin:0 auto;padding-left:var(--pad);padding-right:var(--pad);}

nav{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(13,16,20,.72);backdrop-filter:blur(10px);border-bottom:1px solid var(--ink-line-soft);}
.nav-inner{max-width:var(--maxw);margin:0 auto;padding:14px var(--pad);display:flex;align-items:center;justify-content:space-between;gap:24px;}
.brand{font-family:var(--mono);font-weight:600;font-size:14px;letter-spacing:.04em;color:var(--text);}
.brand b{color:var(--amber);font-weight:600;}
.nav-links{display:flex;gap:26px;font-family:var(--mono);font-size:13px;color:var(--text-dim);}
.nav-links a{transition:color .18s ease;}
.nav-links a:hover{color:var(--amber);}
.nav-cta{font-family:var(--mono);font-size:13px;color:var(--ink);background:var(--amber);padding:7px 14px;border-radius:3px;font-weight:500;transition:background .18s ease,transform .18s ease;}
.nav-cta:hover{background:#F4C264;transform:translateY(-1px);}
.nav-actions{display:flex;align-items:center;gap:10px;}
.nav-ghost{font-family:var(--mono);font-size:13px;color:var(--text);border:1px solid var(--ink-line);padding:6px 13px;border-radius:3px;transition:border-color .18s ease,color .18s ease,transform .18s ease;}
.nav-ghost:hover{border-color:var(--amber);color:var(--amber);transform:translateY(-1px);}

.section{padding-top:clamp(64px,9vw,120px);padding-bottom:clamp(40px,7vw,90px);scroll-margin-top:84px;}
.eyebrow{font-family:var(--mono);font-size:13px;color:var(--amber);letter-spacing:.02em;margin:0 0 26px;display:flex;align-items:center;gap:12px;}
.eyebrow::after{content:"";height:1px;flex:1;background:var(--ink-line);max-width:260px;}

.hero{padding-top:clamp(120px,16vw,180px);padding-bottom:0;position:relative;}
.hero-grid{display:grid;grid-template-columns:1.45fr .9fr;gap:clamp(28px,5vw,64px);align-items:start;}
.hero h1{font-family:var(--display);font-weight:700;font-size:clamp(40px,7vw,76px);line-height:1.02;letter-spacing:-.02em;margin:14px 0 0;}
.hero h1 .accent{color:var(--amber);}
.lede{font-size:clamp(17px,2.1vw,21px);color:var(--text-dim);max-width:52ch;margin:26px 0 0;}
.lede b{color:var(--text);font-weight:500;}
.hero-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:34px;}
.btn{font-family:var(--mono);font-size:14px;padding:12px 20px;border-radius:4px;display:inline-flex;align-items:center;gap:9px;transition:transform .18s ease,border-color .18s ease,background .18s ease,color .18s ease;}
.btn-primary{background:var(--amber);color:var(--ink);font-weight:500;}
.btn-primary:hover{background:#F4C264;transform:translateY(-2px);}
.btn-ghost{border:1px solid var(--ink-line);color:var(--text);}
.btn-ghost:hover{border-color:var(--amber);color:var(--amber);transform:translateY(-2px);}
.btn .arr{transition:transform .18s ease;}
.btn:hover .arr{transform:translate(2px,-2px);}

.panel{background:var(--ink-raised);border:1px solid var(--ink-line);border-radius:8px;overflow:hidden;font-family:var(--mono);font-size:13.5px;}
.panel-bar{display:flex;align-items:center;gap:7px;padding:11px 15px;border-bottom:1px solid var(--ink-line);color:var(--text-faint);font-size:12px;}
.dot{width:11px;height:11px;border-radius:50%;background:var(--ink-line);}
.panel-bar .t{margin-left:8px;letter-spacing:.02em;}
.panel-body{padding:6px 0;}
.row{display:flex;justify-content:space-between;gap:16px;padding:8px 16px;}
.row .k{color:var(--text-faint);}
.row .v{color:var(--text);text-align:right;}
.row .v.live{color:var(--cyan);}
.row .v.warn{color:var(--amber);}
.pulse{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--amber);margin-right:7px;vertical-align:middle;animation:blink 1.6s ease-in-out infinite;}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:.25;}}

.scope{position:relative;margin-top:clamp(48px,7vw,84px);}
.scope canvas{display:block;width:100%;height:120px;}
.scope-label{position:absolute;left:0;bottom:8px;font-family:var(--mono);font-size:11.5px;color:var(--text-faint);letter-spacing:.04em;}
.scope::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--ink-line);}

.about-text{font-size:clamp(18px,2.3vw,23px);line-height:1.55;max-width:40ch;font-family:var(--display);font-weight:400;margin:0;}
.about-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:clamp(28px,5vw,60px);align-items:start;}
.about-side{font-size:16px;color:var(--text-dim);line-height:1.7;}
.about-side p{margin:0 0 16px;}
.about-side b{color:var(--text);font-weight:500;}

.stack-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
.cat{border:1px solid var(--ink-line);border-radius:8px;padding:20px 20px 22px;background:linear-gradient(180deg,rgba(20,26,33,.5),rgba(20,26,33,0));transition:border-color .2s ease,transform .2s ease;}
.cat:hover{transform:translateY(-2px);}
.cat h3{font-family:var(--mono);font-size:12.5px;font-weight:600;color:var(--amber);letter-spacing:.04em;margin:0 0 14px;text-transform:lowercase;}
.chips{display:flex;flex-wrap:wrap;gap:7px;}
.chip{font-family:var(--mono);font-size:12.5px;color:var(--text);border:1px solid var(--ink-line);background:var(--ink);padding:5px 10px;border-radius:4px;line-height:1.3;}

.work-list{display:flex;flex-direction:column;gap:16px;}
.card{border:1px solid var(--ink-line);border-radius:10px;background:var(--ink-raised);padding:clamp(22px,3.2vw,34px);position:relative;overflow:hidden;transition:border-color .2s ease,transform .2s ease;}
.card:hover{border-color:var(--amber);transform:translateY(-3px);}
.card-top{display:flex;align-items:baseline;justify-content:space-between;gap:16px;flex-wrap:wrap;}
.idx{font-family:var(--mono);font-size:13px;color:var(--text-faint);}
.card h3{font-family:var(--display);font-weight:700;font-size:clamp(22px,3vw,30px);margin:0;letter-spacing:-.01em;}
.card .meta{font-family:var(--mono);font-size:12px;color:var(--amber);}
.card p{color:var(--text-dim);margin:16px 0 0;max-width:74ch;font-size:16px;}
.card p b{color:var(--text);font-weight:500;}
.card-foot{display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap;margin-top:22px;}
.tags{display:flex;flex-wrap:wrap;gap:7px;}
.tag{font-family:var(--mono);font-size:11.5px;color:var(--text-dim);border:1px solid var(--ink-line);padding:4px 9px;border-radius:3px;}
.repo{font-family:var(--mono);font-size:13px;color:var(--cyan);display:inline-flex;align-items:center;gap:7px;transition:gap .18s ease;}
.repo:hover{gap:11px;}
.repo span{color:var(--text-faint);}
.featured{border-color:var(--amber-deep);}
.featured::before{content:"";position:absolute;top:0;left:0;width:100%;height:3px;background:linear-gradient(90deg,var(--amber),transparent 70%);}
.flag{font-family:var(--mono);font-size:11px;color:var(--ink);background:var(--amber);padding:3px 9px;border-radius:3px;font-weight:500;margin-left:8px;}
.work-pair{display:grid;grid-template-columns:1fr 1fr;gap:16px;}

.research{border:1px solid var(--ink-line);border-left:3px solid var(--amber);border-radius:8px;padding:clamp(24px,3.5vw,40px);background:var(--ink-raised);}
.research .kicker{font-family:var(--mono);font-size:12px;color:var(--amber);letter-spacing:.03em;}
.research h3{font-family:var(--display);font-weight:700;font-size:clamp(21px,2.7vw,29px);margin:10px 0 0;line-height:1.2;letter-spacing:-.01em;}
.research p{color:var(--text-dim);margin:16px 0 0;max-width:72ch;font-size:16px;}
.research p b{color:var(--text);font-weight:500;}

footer{border-top:1px solid var(--ink-line-soft);margin-top:clamp(48px,8vw,100px);scroll-margin-top:84px;}
.foot-inner{max-width:var(--maxw);margin:0 auto;padding:48px var(--pad) 26px;display:flex;align-items:flex-end;justify-content:space-between;gap:36px;flex-wrap:wrap;}
.foot-lead{flex:1;min-width:260px;}
.foot-lead .eyebrow{margin-bottom:18px;}
.foot-name{font-family:var(--display);font-weight:700;font-size:clamp(28px,5vw,46px);line-height:1;letter-spacing:-.02em;}
.foot-name .accent{color:var(--amber);}
.foot-sub{font-family:var(--mono);font-size:13px;color:var(--text-dim);line-height:1.75;margin:20px 0 0;}
.foot-sub b{color:var(--text);font-weight:600;}
.contact-panel{width:360px;max-width:100%;font-size:13.5px;}
.crow{display:flex;justify-content:space-between;gap:16px;padding:9px 16px;transition:background .15s ease;}
.crow .k{color:var(--text-faint);}
.crow .cv{color:var(--cyan);text-align:right;transition:color .15s ease;}
.crow:hover{background:rgba(234,178,78,0.06);}
.crow:hover .cv{color:var(--amber);}
.foot-base{max-width:var(--maxw);margin:0 auto;padding:0 var(--pad) 48px;font-family:var(--mono);font-size:12px;color:var(--text-faint);}

@media (max-width:860px){
  .hero-grid{grid-template-columns:1fr;}
  .about-grid{grid-template-columns:1fr;gap:28px;}
  .stack-grid{grid-template-columns:repeat(2,1fr);}
  .work-pair{grid-template-columns:1fr;}
  .nav-links{display:none;}
}
@media (max-width:520px){
  .portfolio-root{font-size:16px;}
  .stack-grid{grid-template-columns:1fr;}
  .foot-inner{flex-direction:column;align-items:flex-start;}
  .scope canvas{height:90px;}
}
@media (prefers-reduced-motion:reduce){
  .portfolio-root *{animation:none !important;transition:none !important;}
}
`;
