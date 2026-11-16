"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One scroll reveal for the whole site: each section's heading block and its one
 * primary component rise in once, as they reach the reader. Server HTML is fully
 * visible; only elements that start below the fold are set to "idle" (hidden),
 * and only when motion is allowed, so nothing stays hidden if JavaScript is slow
 * or fails. Rows, links and cards inside a component never animate on their own.
 */
const SELECTOR = [
  "main .section-head",
  "main .cycle-steps",
  "main .month",
  "main .table-wrap",
  "main .price-grid",
  "main .receipt-wrap",
  "main .price-list",
  "main .depth-list",
  "main .ledger",
  "main .faq",
  "main .check-list",
  "main .steps",
  "main .duties",
  "main .next-card",
  "main .people",
  "main .cta-band",
].join(", ");

export default function Reveals() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fold = window.innerHeight;
    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
      (el) => !el.closest(".hero, .page-hero") && el.getBoundingClientRect().top > fold,
    );
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.enter = "in";
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    for (const el of els) {
      el.dataset.enter = "idle";
      io.observe(el);
    }
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
