"use client";

import { useEffect, useRef, useState } from "react";
import { stages, type StageId } from "@/content/stages";
import { Field, FormDone, FormNote, looksLikeEmail, SendStatus, useEnquirySend } from "./formParts";

const SIZES = ["1 to 5", "6 to 20", "21 to 100", "More than 100"];

type Errors = Partial<Record<"name" | "email" | "company" | "need", string>>;

export default function EnquiryForm() {
  const [need, setNeed] = useState<StageId[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [sentTo, setSentTo] = useState({ name: "", email: "" });
  const formRef = useRef<HTMLFormElement>(null);
  const { state, setState, copied, send, copyDraft } = useEnquirySend();

  // Preselect services passed from a stage page or a pricing card (?need=employ,pay).
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("need");
    if (!param) return;
    const ids = param.split(",").filter((x): x is StageId => stages.some((s) => s.id === x));
    if (ids.length) setNeed(ids);
  }, []);

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
    else if (!looksLikeEmail(email)) next.email = "Check the email address: it should look like name@company.com.";
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

    if (await send(data, subject, body, { needs: needLabel })) {
      setSentTo({ name: name.split(" ")[0], email });
      setState("sent");
      form.reset();
      setNeed([]);
    }
  }

  if (state === "sent") {
    return (
      <FormDone title="Enquiry sent" again="Send another enquiry" onAgain={() => setState("idle")}>
        Thanks, {sentTo.name}. We'll reply to {sentTo.email} within one working day to set up a call.
      </FormDone>
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

      <SendStatus state={state} copied={copied} onCopy={copyDraft} />

      <button className="btn btn-primary btn-block" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send enquiry"}
      </button>
      <FormNote />
    </form>
  );
}
