import { useState } from "react";
import Lightbox from "./Lightbox.jsx";

// Screenshots in a window frame. The pager crossfades between shots; clicking
// the frame opens the full-size lightbox.
export default function Gallery({ shots, label, ratio = "16 / 10" }) {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const n = shots.length;

  return (
    <figure className="gallery">
      <div className="shot-bar">
        <span className="dot" /><span className="dot" /><span className="dot" />
        <span className="shot-cap">{shots[i].caption}</span>
        {n > 1 && (
          <span className="shot-pager">
            {shots.map((s, k) => (
              <button
                type="button"
                key={s.src}
                className={k === i ? "on" : undefined}
                aria-label={`Screenshot ${k + 1} of ${n}: ${s.caption}`}
                aria-current={k === i || undefined}
                onClick={() => setI(k)}
              />
            ))}
          </span>
        )}
      </div>
      <button
        type="button"
        className="shot-frame"
        style={{ aspectRatio: ratio }}
        onClick={() => setOpen(true)}
        aria-label={`Enlarge screenshot: ${shots[i].caption}`}
      >
        {shots.map((s, k) => (
          <img
            key={s.src}
            src={s.src}
            width={s.w}
            height={s.h}
            alt={k === i ? `${label}: ${s.caption}` : ""}
            loading="lazy"
            decoding="async"
            className={[k === i && "on", s.fit === "contain" && "contain"].filter(Boolean).join(" ") || undefined}
          />
        ))}
        <span className="shot-zoom" aria-hidden="true">⤢ enlarge</span>
      </button>
      {open && (
        <Lightbox
          shots={shots}
          start={i}
          label={label}
          onClose={(k) => {
            setOpen(false);
            setI(k);
          }}
        />
      )}
    </figure>
  );
}
