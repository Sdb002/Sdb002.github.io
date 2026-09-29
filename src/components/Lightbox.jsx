import { useLayoutEffect, useRef, useState } from "react";

// Full-size screenshot viewer on a native <dialog>, which gives focus trapping
// and Escape-to-close for free. Arrow keys and horizontal swipes page through.
export default function Lightbox({ shots, start, label, onClose }) {
  const ref = useRef(null);
  const touchX = useRef(null);
  const [i, setI] = useState(start);
  const n = shots.length;
  const s = shots[i];
  const go = (delta) => setI((k) => (k + delta + n) % n);
  const close = () => onClose(i);

  // Layout effect: open before first paint so the dialog never flashes inline.
  useLayoutEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      if (dialog.open) dialog.close();
    };
  }, []);

  const onKeyDown = (e) => {
    if (n < 2) return;
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null || n < 2) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={`${label} screenshots`}
      onCancel={(e) => { e.preventDefault(); close(); }}
      onClick={(e) => e.target === e.currentTarget && close()}
      onKeyDown={onKeyDown}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
    >
      <figure className="lb-figure">
        <img key={s.src} className="lb-img" src={s.src} width={s.w} height={s.h} alt={`${label}: ${s.caption}`} />
        <figcaption>
          {n > 1 && <span className="lb-count">{i + 1} / {n}</span>}
          {s.caption}
        </figcaption>
      </figure>
      <button type="button" className="lb-btn lb-close" onClick={close} aria-label="Close">✕</button>
      {n > 1 && (
        <>
          <button type="button" className="lb-btn lb-prev" onClick={() => go(-1)} aria-label="Previous screenshot">←</button>
          <button type="button" className="lb-btn lb-next" onClick={() => go(1)} aria-label="Next screenshot">→</button>
        </>
      )}
    </dialog>
  );
}
