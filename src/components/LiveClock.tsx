"use client";

import { useEffect, useRef, useState } from "react";

const TASKS = [
  "Onboarding a new joiner",
  "Depositing last month's TDS",
  "Filing PF and ESI returns",
  "Answering a payslip question",
  "Shortlisting backend engineers",
];

const IST = "Asia/Kolkata";

function cityOf(tz: string) {
  const part = tz.split("/").pop() ?? tz;
  return part.replace(/_/g, " ");
}

function fmt(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone }).format(date);
}

/** Minutes from UTC midnight for a given wall-clock hour in a zone, today. */
function offsetMinutes(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUTC = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
  return Math.round((asUTC - date.getTime()) / 60000);
}

/** Overlap, in hours, between a 9:00–18:00 workday in the visitor's zone and in India. */
function overlapHours(date: Date, tz: string) {
  const a = offsetMinutes(date, tz);
  const b = offsetMinutes(date, IST);
  // Workday in UTC minutes: [9h - offset, 18h - offset]
  const aStart = 9 * 60 - a, aEnd = 18 * 60 - a;
  const bStart = 9 * 60 - b, bEnd = 18 * 60 - b;
  let best = 0;
  for (const shift of [-1440, 0, 1440]) {
    const s = Math.max(aStart, bStart + shift);
    const e = Math.min(aEnd, bEnd + shift);
    best = Math.max(best, e - s);
  }
  return Math.max(0, best) / 60;
}

export default function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);
  const [tz, setTz] = useState("UTC");
  const [task, setTask] = useState(0);
  const [swapping, setSwapping] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
    setNow(new Date());
    const tick = setInterval(() => setNow(new Date()), 15000);

    // Reduced motion: no auto-updating text at all (WCAG 2.2.2).
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rotate: ReturnType<typeof setInterval> | undefined;
    let swap: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      if (reduce || rotate) return;
      rotate = setInterval(() => {
        setSwapping(true);
        swap = setTimeout(() => {
          setTask((t) => (t + 1) % TASKS.length);
          setSwapping(false);
        }, 200);
      }, 3400);
    };
    const stop = () => {
      if (rotate) clearInterval(rotate);
      rotate = undefined;
    };
    // Only rotate while the card is on screen.
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    if (ref.current) io.observe(ref.current);
    return () => {
      clearInterval(tick);
      stop();
      io.disconnect();
      if (swap) clearTimeout(swap);
    };
  }, []);

  const inIndia = tz === IST || tz === "Asia/Calcutta";
  const youTz = inIndia ? "Europe/London" : tz;
  const overlap = now ? overlapHours(now, youTz) : null;
  const overlapText =
    overlap === null
      ? "Shared hours with India"
      : overlap >= 9
        ? "Same working hours as India"
        : overlap > 0
          ? `${overlap % 1 ? overlap.toFixed(1) : overlap} h of shared working hours`
          : "No shared hours: handover overnight";

  return (
    <div className="float float-time" ref={ref} aria-label="Your time and India time">
      <div className="float-head">
        {overlapText}
        <span className="float-ex">Example</span>
      </div>
      <div className="clockpair">
        <div>
          <small>{inIndia ? "London" : `You, ${cityOf(youTz)}`}</small>
          <b>{now ? fmt(now, youTz) : "--:--"}</b>
        </div>
        <span className="sep" aria-hidden="true" />
        <div>
          <small>Pune, IST</small>
          <b>{now ? fmt(now, IST) : "--:--"}</b>
        </div>
      </div>
      <p className="now-line">
        <span className="now-dot" aria-hidden="true" />
        <span className="now-text" data-swapping={swapping} aria-live="off">
          {TASKS[task]}
        </span>
      </p>
    </div>
  );
}
