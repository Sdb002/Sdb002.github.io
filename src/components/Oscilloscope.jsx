import { useEffect, useRef } from "react";

// Oscilloscope trace — signature element. Subtle, ambient, freezes on reduced motion.
export default function Oscilloscope() {
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
    let running = false;
    let lastT = 0.6;

    const wave = (p, t, mid) =>
      mid +
      Math.sin(p * 9 + t * 1.1) * 13 * Math.sin(p * Math.PI) +
      Math.sin(p * 23 - t * 1.7) * 4 +
      Math.sin(p * 51 + t * 0.6) * 2;

    function trace(t) {
      lastT = t;
      ctx.clearRect(0, 0, w, h);
      const mid = h * 0.62;

      // faint baseline grid ticks
      ctx.strokeStyle = "rgba(34,43,54,0.9)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 46) {
        ctx.beginPath();
        ctx.moveTo(x, mid - 4);
        ctx.lineTo(x, mid + 4);
        ctx.stroke();
      }

      // the waveform
      ctx.beginPath();
      for (let i = 0; i <= w; i += 2) {
        const y = wave(i / w, t, mid);
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.strokeStyle = "#EAB24E";
      ctx.lineWidth = 1.6;
      ctx.shadowColor = "rgba(234,178,78,0.5)";
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // leading dot
      const lp = (t * 0.12) % 1;
      ctx.beginPath();
      ctx.arc(lp * w, wave(lp, t, mid), 2.6, 0, Math.PI * 2);
      ctx.fillStyle = "#F4C264";
      ctx.fill();
    }

    function resize() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      trace(lastT); // resizing clears the canvas; redraw so a paused trace never goes blank
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    if (reduce) return () => ro.disconnect();

    const start = performance.now();
    const loop = (now) => {
      trace((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    // Only animate while the trace is on screen.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div className="scope" aria-hidden="true">
      <canvas ref={canvasRef} />
      <span className="scope-label">// signal — always monitoring</span>
    </div>
  );
}
