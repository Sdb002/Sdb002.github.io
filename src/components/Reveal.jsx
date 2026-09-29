import { useEffect, useRef, useState } from "react";

/**
 * [ref, shown] — `shown` flips to true (once) when the element scrolls into
 * view. Without IntersectionObserver, content is shown immediately.
 */
export function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return [ref, shown];
}

export const revealClass = (shown, className) =>
  ["reveal", shown && "in", className].filter(Boolean).join(" ");

/** Fades and lifts its element in on first scroll into view; `delay` staggers siblings (ms). */
export default function Reveal({ as: Tag = "div", delay = 0, className, style, children, ...rest }) {
  const [ref, shown] = useReveal();
  return (
    <Tag ref={ref} className={revealClass(shown, className)} style={{ ...style, "--d": `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}
