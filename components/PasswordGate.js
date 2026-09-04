"use client";

import { useState, useEffect } from "react";
import { AUDIENCE } from "../lib/questions";

const STORAGE_KEY = "sepa_q_auth";
const PASSWORD = "antennagroup";

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "ok") {
        setUnlocked(true);
      }
    } catch (e) {}
    setChecked(true);
  }, []);

  function submit(e) {
    e.preventDefault();
    if (value.trim().toLowerCase() === PASSWORD) {
      setUnlocked(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "ok");
      } catch (e) {}
    } else {
      setError("That isn't quite right. Try again.");
    }
  }

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-ink-muted text-sm">Loading.</div>
      </div>
    );
  }

  if (unlocked) return children;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative z-10">
      <div className="w-full max-w-prose">
        <div className="mb-10 reveal reveal-delay-1 flex items-center gap-5">
          <a
            href="/"
            className="block hover-lift"
            aria-label="SEPA Brand Foundation Study home"
          >
            <img
              src="https://ktuyiikwhspwmzvyczit.supabase.co/storage/v1/object/public/assets/brand/antenna-new-logo.svg"
              alt="Antenna Group"
              className="h-12 w-auto"
            />
          </a>
          <span className="h-8 w-px bg-rule" aria-hidden></span>
          <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-ink-muted leading-tight">
            Strategy work<br />
            by{" "}
            <a
              href="https://antennagroup.com"
              target="_blank"
              rel="noreferrer"
              className="text-ink-soft hover:text-ink underline decoration-rule underline-offset-4 hover:decoration-ink transition-colors"
            >
              Antenna Group
            </a>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-5 reveal reveal-delay-2">
          <p className="font-sans font-semibold text-[11px] uppercase tracking-[0.22em] text-accent">
            SEPA &nbsp;/&nbsp; Brand Foundation Study
          </p>
          <span
            className={`font-sans font-semibold text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-sm border ${
              AUDIENCE === "internal"
                ? "border-ink text-ink bg-ink/[0.04]"
                : "border-rule text-ink-soft bg-paper-tint/60"
            }`}
          >
            {AUDIENCE === "internal"
              ? "Internal edition"
              : "Member and partner edition"}
          </span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl tracking-tightish text-ink leading-[1.05] mb-5 reveal reveal-delay-2 text-balance">
          We want to hear it in your words.
        </h1>

        <p className="text-ink-soft text-sm leading-relaxed mb-8 max-w-[72ch] text-pretty reveal reveal-delay-3">
          {AUDIENCE === "internal"
            ? "A private workspace for SEPA staff, leadership, board, and the PUF team. This version includes questions intended for people inside the organization, so it should not be forwarded outside it. Members, partners and readers have a separate link."
            : "A private workspace for SEPA members, partners, PUF readers, and others across the sector. Enter the password to begin."}{" "}
          Your progress saves automatically, but only in this browser on this
          device, so start on the machine you intend to finish on.
        </p>

        <form
          onSubmit={submit}
          className="space-y-4 max-w-sm reveal reveal-delay-4"
        >
          <div>
            <label
              htmlFor="pw"
              className="block font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted mb-2"
            >
              Password
            </label>
            <input
              id="pw"
              type="password"
              autoFocus
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError("");
              }}
              className="w-full bg-paper-tint/50 border border-rule-soft rounded-sm px-4 py-3 text-base text-ink placeholder:text-ink-muted/60 transition-colors focus:border-ink focus:bg-paper-tint/70 hover:bg-paper-tint/60"
            />
            {error ? (
              <p className="mt-2 text-sm text-accent">{error}</p>
            ) : null}
          </div>
          <button
            type="submit"
            className="hover-lift px-7 py-3 font-sans text-sm font-semibold uppercase tracking-[0.18em] bg-ink text-paper rounded-sm hover:bg-ink-soft"
          >
            Continue
          </button>
        </form>

        <p className="mt-16 text-sm text-ink-muted reveal reveal-delay-5">
          If you don't have the password, contact{" "}
          <a
            href="mailto:paul.newton@antennagroup.com"
            className="text-ink-soft underline decoration-rule underline-offset-4 hover:text-ink"
          >
            paul.newton@antennagroup.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
