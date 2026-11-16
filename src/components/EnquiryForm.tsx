"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { stages, type StageId } from "@/content/stages";
import { Tick } from "./bits";

const ENDPOINT = "https://api.web3forms.com/submit";
const SIZES = ["1 to 5", "6 to 20", "21 to 100", "More than 100"];

type Errors = Partial<Record<"name" | "email" | "company" | "need", string>>;

export default function EnquiryForm() {
  const [need, setNeed] = useState<StageId[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [sentTo, setSentTo] = useState({ name: "", email: "" });
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const canPost = Boolean(site.web3formsKey);

  // Preselect services passed from a stage page or a pricing card (?need=employ,pay).
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("need");
    if (!param) return;
    const ids = param.split(",").filter((x): x is StageId => stages.some((s) => s.id === x));
    if (ids.length) setNeed(ids);
  }, []);

  useEffect(() => {
    if (state === "sent") doneRef.current?.focus();
  }, [state]);

  const toggle = (id: StageId) =>
    setNeed((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();

    const next: Errors = {};
    if (!name) next.name = "Enter your name.";
    if (!email) next.email = "Enter your work email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Check the email address: it should look like name@company.com.";
    if (!company) next.company = "Enter your company name.";
    if (need.length === 0) next.need = "Choose at least one service.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      (form.querySelector(first === "need" ? "#need-hire" : `[name="${first}"]`) as HTMLElement | null)?.focus();
      return;
    }

    const needLabel = need.map((id) => stages.find((s) => s.id === id)?.label ?? id).join(", ");
    const subject = `Enquiry: ${needLabel} for ${company}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      `Country: ${data.get("country") || "-"}`,
      `Needs: ${needLabel}`,
      `Team size: ${data.get("size") || "Not sure"}`,
      "",
      String(data.get("message") || ""),
    ].join("\n");

    if (!canPost) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setState("sending");
    try {
      data.set("access_key", site.web3formsKey);
      data.set("subject", subject);
      data.set("from_name", "Pavani IT website");
      data.set("needs", needLabel);
      const res = await fetch(ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: data });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error(json.message || res.statusText);
      setSentTo({ name: name.split(" ")[0], email });
      setState("sent");
      form.reset();
      setNeed([]);
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div className="form-done" ref={doneRef} tabIndex={-1}>
        <Tick />
        <h2 className="h3">Enquiry sent</h2>
        <p>
          Thanks, {sentTo.name}. We'll reply to {sentTo.email} within one working day to set up a call.
        </p>
        <button type="button" className="btn btn-secondary" onClick={() => setState("idle")}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="form-card" ref={formRef} onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <Field id="f-name" name="name" label="Your name" autoComplete="name" error={errors.name} />
        <Field id="f-email" name="email" type="email" label="Work email" autoComplete="email" error={errors.email} />
      </div>
      <div className="field-row">
        <Field id="f-company" name="company" label="Company" autoComplete="organization" error={errors.company} />
        <Field id="f-country" name="country" label="Country" autoComplete="country-name" optional />
      </div>

      <fieldset className="chips" aria-invalid={errors.need ? true : undefined} aria-describedby={errors.need ? "need-error" : undefined}>
        <legend className="label">What do you need?</legend>
        {stages.map((s) => (
          <div className="chip" key={s.id}>
            <input type="checkbox" id={`need-${s.id}`} checked={need.includes(s.id)} onChange={() => toggle(s.id)} />
            <label htmlFor={`need-${s.id}`}>
              <b>{s.label}</b>
              <span>{s.services.map((x) => x.name).join(", ")}</span>
            </label>
          </div>
        ))}
        {errors.need && (
          <p className="field-error" id="need-error">
            {errors.need}
          </p>
        )}
      </fieldset>

      <div className="field">
        <label className="label" htmlFor="f-size">
          How many people?
        </label>
        <select className="input" id="f-size" name="size" defaultValue="">
          <option value="">Not sure yet</option>
          {SIZES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="label" htmlFor="f-msg">
          Roles, locations and timing <span className="opt">Optional</span>
        </label>
        <textarea className="input" id="f-msg" name="message" rows={4} placeholder="For example: two backend engineers, starting in February" />
      </div>

      <input className="hp" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {state === "failed" && (
        <p className="form-error" role="alert">
          Your enquiry didn't send. Check your connection and try again, or email us at {site.email}.
        </p>
      )}

      <button className="btn btn-primary btn-block" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send enquiry"}
      </button>
      <p className="form-note">
        We use these details only to reply to you. Read our <Link prefetch={false} href="/privacy/">privacy notice</Link>.
        {!canPost && " Sending opens your email app with your details filled in."}
      </p>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  error,
  optional,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  optional?: boolean;
}) {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
        {optional && <span className="opt">Optional</span>}
      </label>
      <input
        className="input"
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
