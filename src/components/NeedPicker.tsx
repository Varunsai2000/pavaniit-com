"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { needPhrase, stages, type StageId } from "@/content/stages";
import { stageIcon } from "./bits";

/** Hero action: pick what you need; the booking link carries it into the contact form. */
export default function NeedPicker() {
  const [picked, setPicked] = useState<StageId[]>(["employ"]);

  const toggle = (id: StageId) =>
    setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const ordered = stages.filter((s) => picked.includes(s.id));
  const href = ordered.length ? `/contact/?need=${ordered.map((s) => s.id).join(",")}` : "/contact/";
  const phrases = ordered.map((s) => needPhrase[s.id]);
  const hint =
    phrases.length === 0
      ? "Pick what you need, or just book a call."
      : `We'll come prepared to talk about ${
          phrases.length === 1 ? phrases[0] : `${phrases.slice(0, -1).join(", ")} and ${phrases.at(-1)}`
        }.`;

  return (
    <div className="need-picker">
      <fieldset className="need">
        <legend>What do you need help with?</legend>
        <div className="need-chips">
          {stages.map((stage) => {
            const Icon = stageIcon[stage.id];
            const id = `need-${stage.id}`;
            return (
              <div className="need-chip" key={stage.id}>
                <input type="checkbox" id={id} checked={picked.includes(stage.id)} onChange={() => toggle(stage.id)} />
                <label htmlFor={id}>
                  <Icon aria-hidden="true" strokeWidth={1.9} />
                  {stage.label}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
      <div className="hero-actions">
        <Link prefetch={false} className="btn btn-primary" href={href}>
          Book a call
          <ArrowRight aria-hidden="true" />
        </Link>
        <span className="hero-hint" aria-live="polite">
          {hint}
        </span>
      </div>
    </div>
  );
}
