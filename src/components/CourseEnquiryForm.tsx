"use client";

import { useEffect, useState } from "react";
import { classModes, courses } from "@/content/courses";
import { Field, FormDone, FormNote, looksLikeEmail, SendStatus, useEnquirySend } from "./formParts";

const NOT_SURE = "Not sure yet";
const MODES = [...classModes, "Either"];
const NOW = ["Studying", "Graduated, looking for work", "Working, want to switch careers", "Working, want to learn a new skill"];

type Errors = Partial<Record<"name" | "email" | "course", string>>;

/** For individuals asking about a course batch. Companies use the enquiry form on /contact/. */
export default function CourseEnquiryForm() {
  const [course, setCourse] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sentTo, setSentTo] = useState({ name: "", email: "" });
  const { state, setState, copied, send, copyDraft } = useEnquirySend();

  // Preselect the course passed from a course page (?course=data-engineering).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("course");
    const match = courses.find((c) => c.slug === slug);
    if (match) setCourse(match.name);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();

    const next: Errors = {};
    if (!name) next.name = "Enter your name.";
    if (!email) next.email = "Enter your email.";
    else if (!looksLikeEmail(email)) next.email = "Check the email address: it should look like name@example.com.";
    if (!course) next.course = `Choose a course, or "${NOT_SURE}".`;
    setErrors(next);
    if (Object.keys(next).length) {
      (form.querySelector(`[name="${Object.keys(next)[0]}"]`) as HTMLElement | null)?.focus();
      return;
    }

    const mode = String(data.get("mode") || "No preference");
    const subject = `Course enquiry: ${course}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${data.get("phone") || "-"}`,
      `Course: ${course}`,
      `Attending: ${mode}`,
      `Now: ${data.get("now") || "-"}`,
      "",
      String(data.get("message") || ""),
    ].join("\n");

    if (await send(data, subject, body)) {
      setSentTo({ name: name.split(" ")[0], email });
      setState("sent");
      form.reset();
      setCourse("");
    }
  }

  if (state === "sent") {
    return (
      <FormDone title="Question sent" again="Ask about another course" onAgain={() => setState("idle")}>
        Thanks, {sentTo.name}. We&apos;ll reply to {sentTo.email} within one working day with the next batch dates,
        timings and the fee.
      </FormDone>
    );
  }

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <Field id="c-name" name="name" label="Your name" autoComplete="name" error={errors.name} />
        <Field id="c-email" name="email" type="email" label="Email" autoComplete="email" error={errors.email} />
      </div>
      <Field id="c-phone" name="phone" type="tel" label="Phone or WhatsApp" autoComplete="tel" optional />

      <div className="field">
        <label className="label" htmlFor="c-course">
          Which course?
        </label>
        <select
          className="input"
          id="c-course"
          name="course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          aria-invalid={errors.course ? true : undefined}
          aria-describedby={errors.course ? "c-course-error" : undefined}
        >
          <option value="" disabled>
            Choose a course
          </option>
          {courses.map((c) => (
            <option key={c.slug}>{c.name}</option>
          ))}
          <option>{NOT_SURE}</option>
        </select>
        {errors.course && (
          <p className="field-error" id="c-course-error">
            {errors.course}
          </p>
        )}
      </div>

      <fieldset className="chips chips-3">
        <legend className="label">
          How would you like to attend? <span className="opt">Optional</span>
        </legend>
        {MODES.map((m, i) => (
          <div className="chip" key={m}>
            <input type="radio" id={`mode-${i}`} name="mode" value={m} />
            <label htmlFor={`mode-${i}`}>
              <b>{m}</b>
            </label>
          </div>
        ))}
      </fieldset>

      <div className="field">
        <label className="label" htmlFor="c-now">
          What are you doing now? <span className="opt">Optional</span>
        </label>
        <select className="input" id="c-now" name="now" defaultValue="">
          <option value="">Choose one</option>
          {NOW.map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="label" htmlFor="c-msg">
          Anything else? <span className="opt">Optional</span>
        </label>
        <textarea className="input" id="c-msg" name="message" rows={3} placeholder="For example: I finish college in May and would like a weekend batch" />
      </div>

      <input className="hp" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <SendStatus state={state} copied={copied} onCopy={copyDraft} what="question" />

      <button className="btn btn-primary btn-block" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Ask about a batch"}
      </button>
      <FormNote> If you&apos;re under 18, ask a parent or guardian to send this for you.</FormNote>
    </form>
  );
}
