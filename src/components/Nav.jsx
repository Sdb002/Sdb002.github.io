import { useEffect, useState } from "react";
import { GITHUB_URL, NAV_LINKS } from "../data.jsx";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

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
            <a href={`#${l}`} key={l}>{l}</a>
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
        {[...NAV_LINKS, "contact"].map((l) => (
          <a href={`#${l}`} key={l} onClick={close}>
            <span className="nm-prefix">~/</span>{l}
          </a>
        ))}
      </div>
    </nav>
  );
}
