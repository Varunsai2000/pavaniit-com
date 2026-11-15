"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wraps the four-stage grid. Reveals the cards once when they scroll into
 * view and draws a marigold thread from badge 1 to badge 4, measured from the
 * real layout so it always lands on the badges.
 */
export default function Journey({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "in">("idle");
  const [geo, setGeo] = useState<{ w: number; h: number; d: string } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const box = el.getBoundingClientRect();
      const nums = Array.from(el.querySelectorAll<HTMLElement>(".stage-num"));
      if (nums.length < 2 || window.innerWidth <= 1100) return setGeo(null);
      const pts = nums.map((n) => {
        const r = n.getBoundingClientRect();
        // Badge centres, measured without the reveal transform.
        return { x: r.left - box.left + r.width / 2, y: n.offsetTop + r.height / 2 };
      });
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i];
        const mid = (a.x + b.x) / 2;
        d += ` C ${mid} ${a.y - 70}, ${mid} ${b.y - 70}, ${b.x} ${b.y}`;
      }
      setGeo({ w: box.width, h: box.height, d });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
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
