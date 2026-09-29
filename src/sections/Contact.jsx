import { CONTACT } from "../data.jsx";

export default function Contact() {
  return (
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
      <div className="foot-base">built with react, vite &amp; a canvas signature</div>
    </footer>
  );
}
