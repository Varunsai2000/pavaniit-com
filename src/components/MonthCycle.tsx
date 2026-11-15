"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

type Due = { key: string; label: string; day: number | "payday" };

const DUES: Due[] = [
  { key: "tds", label: "Income tax (TDS) on last month's salaries deposited", day: 7 },
  { key: "pf", label: "PF and ESI for last month paid", day: 15 },
  { key: "pay", label: "This month's salaries credited, payslips sent", day: "payday" },
];

type Model = {
  monthName: string;
  today: number;
  offset: number;
  daysInMonth: number;
  dues: { key: string; label: string; day: number }[];
};

function build(now: Date): Model {
  const y = now.getFullYear();
  const m = now.getMonth();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  let payday = daysInMonth;
  while ([0, 6].includes(new Date(y, m, payday).getDay())) payday--;
  return {
    monthName: now.toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
    today: now.getDate(),
    offset: (new Date(y, m, 1).getDay() + 6) % 7,
    daysInMonth,
    dues: DUES.map((d) => ({ ...d, day: d.day === "payday" ? payday : d.day })),
  };
}

function status(day: number, today: number) {
  const diff = day - today;
  if (diff < 0) return { cls: "badge-done", text: "Done", done: true };
  if (diff === 0) return { cls: "badge-due", text: "Today", done: false };
  return { cls: "badge-due", text: diff === 1 ? "Tomorrow" : `In ${diff} days`, done: false };
}

/**
 * This month's statutory calendar, computed in the visitor's browser. The
 * server-rendered version shows the same list with fixed due dates.
 */
export default function MonthCycle() {
  const [model, setModel] = useState<Model | null>(null);
  useEffect(() => setModel(build(new Date())), []);

  return (
    <div className="month" data-ready={model ? "true" : "false"}>
      <div className="month-card">
        <div className="month-head">
          <p className="month-name">{model ? model.monthName : "Every month"}</p>
          <p className="small muted">Handled for your team</p>
        </div>

        {model && (
          <div className="month-grid" aria-hidden="true">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span className="month-dow" key={i}>
                {d}
              </span>
            ))}
            {Array.from({ length: model.offset }, (_, i) => (
              <span key={`b${i}`} />
            ))}
            {Array.from({ length: model.daysInMonth }, (_, i) => {
              const day = i + 1;
              const dueIndex = model.dues.findIndex((d) => d.day === day);
              const cls = [
                "month-day",
                day < model.today && "is-past",
                day === model.today && "is-today",
                dueIndex >= 0 && "is-due",
                dueIndex >= 0 && day < model.today && "is-done",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <span key={day} className={cls} style={dueIndex >= 0 ? ({ "--i": dueIndex } as React.CSSProperties) : undefined}>
                  {day}
                </span>
              );
            })}
          </div>
        )}

        <ul className="month-list">
          {(model ? model.dues : DUES.map((d) => ({ ...d, day: d.day === "payday" ? 0 : d.day }))).map((d) => {
            const s = model ? status(d.day, model.today) : null;
            return (
              <li key={d.key}>
                <span className="d">{d.day === 0 ? <span className="d-small">Month end</span> : d.day}</span>
                <span>{d.label}</span>
                {s && (
                  <span className={`badge ${s.cls}`}>
                    {s.done && <Check aria-hidden="true" strokeWidth={3} />}
                    {s.text}
                  </span>
                )}
              </li>
            );
          })}
          <li>
            <span className="d-small">Varies</span>
            <span>Professional tax and labour welfare fund, on each state's dates</span>
            <span className="badge badge-neutral">Tracked</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
