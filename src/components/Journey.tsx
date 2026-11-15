"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wraps the four-stage grid. Draws a thread that leaves the top of each
 * numbered badge's ring and arches over the gap to the next one, measured
 * from the real layout. Cards render visible on the server; they are only
 * hidden (then revealed once) when they start below the fold, so nothing
 * stays hidden if JavaScript is slow or fails.
 */
export default function Journey({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "idle" | "in">("static");
  const [geo, setGeo] = useState<{ w: number; h: number; d: string } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Position relative to the journey box, ignoring the reveal transform.
    const offsetWithin = (node: HTMLElement) => {
      let y = 0;
      let n: HTMLElement | null = node;
      while (n && n !== el) {
        y += n.offsetTop;
        n = n.offsetParent as HTMLElement | null;
      }
      return y;
    };

    const measure = () => {
      const box = el.getBoundingClientRect();
      const nums = Array.from(el.querySelectorAll<HTMLElement>(".stage-num"));
      if (nums.length < 2 || window.innerWidth <= 1100) return setGeo(null);
      const css = getComputedStyle(el);
      const ring = parseFloat(css.getPropertyValue("--badge-ring")) || 0;
      const rise = parseFloat(css.getPropertyValue("--thread-rise")) || 0;
      const pts = nums.map((n) => {
        const r = n.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: offsetWithin(n) - ring };
      });
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i];
        d += ` C ${a.x} ${a.y - rise}, ${b.x} ${b.y - rise}, ${b.x} ${b.y}`;
      }
      setGeo({ w: box.width, h: box.height, d });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    // Only animate cards that start below the fold.
    const below = el.getBoundingClientRect().top > window.innerHeight;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    if (below) {
      setState("idle");
      io.observe(el);
    }
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className="journey" ref={ref} data-reveal={state}>
      {geo && (
        <svg className="journey-path" viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
          <path className="track" d={geo.d} />
          <path className="draw" d={geo.d} pathLength={1} />
        </svg>
      )}
      {children}
    </div>
  );
}
