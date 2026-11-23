"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Tick } from "./bits";

/** Shared by the company enquiry form and the course enquiry form. */

const ENDPOINT = "https://api.web3forms.com/submit";
export const canPost = Boolean(site.web3formsKey);
export const looksLikeEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export type SendState = "idle" | "sending" | "sent" | "failed" | "mailto";

/**
 * Delivers an enquiry through Web3Forms. With no access key set, it hands the enquiry to
 * the visitor's email app instead and keeps a copy on screen in case no email app opens.
 * `send` resolves true only when Web3Forms accepted it; the caller then shows its sent state.
 */
export function useEnquirySend() {
  const [state, setState] = useState<SendState>("idle");
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);

  async function send(data: FormData, subject: string, body: string, extra: Record<string, string> = {}) {
    if (!canPost) {
      setDraft(`Subject: ${subject}\n\n${body}`);
      setCopied(false);
      setState("mailto");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return false;
    }

    setState("sending");
    try {
      data.set("access_key", site.web3formsKey);
      data.set("subject", subject);
      data.set("from_name", "Pavani IT website");
      for (const [k, v] of Object.entries(extra)) data.set(k, v);
      const res = await fetch(ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: data });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error(json.message || res.statusText);
      return true;
    } catch {
      setState("failed");
      return false;
    }
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return { state, setState, copied, send, copyDraft };
}

/** The line under the form: what happens to the details, and how sending works. */
export function FormNote({ children }: { children?: React.ReactNode }) {
  return (
    <p className="form-note">
      We use these details only to reply to you. Read our <Link prefetch={false} href="/privacy/">privacy notice</Link>.
      {!canPost && " Sending opens your email app with your details filled in."}
      {children}
    </p>
  );
}

/** What the visitor sees after pressing send without a form service, or when sending failed. */
export function SendStatus({ state, copied, onCopy, what = "enquiry" }: { state: SendState; copied: boolean; onCopy: () => void; what?: string }) {
  if (state === "mailto") {
    return (
      <div className="form-status" role="status">
        <p>
          Your email app should open with this {what} filled in. If it didn&apos;t, send it to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <button type="button" className="btn btn-secondary btn-sm" onClick={onCopy}>
          {copied ? `${capitalise(what)} copied` : `Copy the ${what}`}
        </button>
      </div>
    );
  }
  if (state === "failed") {
    return (
      <p className="form-error" role="alert">
        Your {what} didn&apos;t send. Check your connection and try again, or email us at {site.email}.
      </p>
    );
  }
  return null;
}

/** The sent state: takes focus when it appears, so screen readers announce it. */
export function FormDone({ title, children, again, onAgain }: { title: string; children: React.ReactNode; again: string; onAgain: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <div className="form-done" ref={ref} tabIndex={-1}>
      <Tick />
      <h2 className="h3">{title}</h2>
      <p>{children}</p>
      <button type="button" className="btn btn-secondary" onClick={onAgain}>
        {again}
      </button>
    </div>
  );
}

export function Field({
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

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
