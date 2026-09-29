import { useEffect, useState } from "react";
import { GITHUB_URL, NAV_LINKS } from "../data.jsx";
import { useScrollSpy } from "../hooks/useScrollSpy.js";

const SPY_IDS = ["top", ...NAV_LINKS, "contact"];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(SPY_IDS);
  const close = () => setOpen(false);
  const linkProps = (id) => (active === id ? { className: "active", "aria-current": "true" } : {});

  // Close the mobile menu on Escape, or when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    const mq = window.matchMedia("(min-width: 861px)");
    const onWide = (e) => e.matches && close();
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <nav className={open ? "nav open" : "nav"}>
      <div className="nav-inner">
        <a href="#top" className="brand" onClick={close}><b>~/</b>shuvro</a>
        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <a href={`#${l}`} key={l} {...linkProps(l)}>{l}</a>
          ))}
        </div>
        <div className="nav-actions">
          <a href="#contact" className="nav-ghost">contact</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">github ↗</a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span />
          </button>
        </div>
      </div>
      <div id="mobile-menu" className="nav-menu" hidden={!open}>
        {[...NAV_LINKS, "contact"].map((l, i) => (
          <a href={`#${l}`} key={l} onClick={close} style={{ "--i": i }} {...linkProps(l)}>
            <span className="nm-prefix">~/</span>{l}
          </a>
        ))}
      </div>
      <div className="progress" aria-hidden="true" />
    </nav>
  );
}
