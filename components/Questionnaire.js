"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { sections } from "../lib/questions";
import Header from "./Header";
import ProgressRail from "./ProgressRail";
import QuestionBlock from "./QuestionBlock";
import ReviewPage from "./ReviewPage";

const STORAGE_KEY = "sepa_q_draft_v1";
const SUBMITTED_KEY = "sepa_q_submitted";
const CONTACT_EMAIL = "paul.newton@antennagroup.com";

// Precompute global question numbering across all sections.
const totalQuestions = sections.reduce(
  (sum, s) => sum + s.questions.length,
  0
);
const totalQuestionsLabel = String(totalQuestions).padStart(2, "0");
const questionNumberMap = (() => {
  let n = 0;
  const map = {};
  for (const s of sections) {
    for (const q of s.questions) {
      n += 1;
      map[q.id] = n;
    }
  }
  return map;
})();

export default function Questionnaire() {
  const [answers, setAnswers] = useState({});
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [saved, setSaved] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [revealedSections, setRevealedSections] = useState(
    () => new Set()
  );
  const [revealedQuestions, setRevealedQuestions] = useState(
    () => new Set()
  );
  const [reviewing, setReviewing] = useState(false);

  const saveTimer = useRef(null);
  const sectionRefs = useRef({});
  const questionRefs = useRef({});

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SUBMITTED_KEY) === "ok") {
        setSubmitted(true);
        return;
      }
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data && typeof data === "object") setAnswers(data);
      }
    } catch (e) {}
  }, []);

  // Debounced autosave to localStorage
  const persist = useCallback((data) => {
    setSaved(false);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setSaved(true);
      } catch (e) {}
    }, 600);
  }, []);

  function setAnswer(id, value) {
    setAnswers((prev) => {
      const next = { ...prev, [id]: value };
      persist(next);
      return next;
    });
  }

  // Track active section while scrolling
  useEffect(() => {
    if (!showForm) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.dataset.sectionId);
          }
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [showForm]);

  // Resolve the active section object (for the mobile navigator)
  const activeSectionObj = useMemo(
    () => sections.find((s) => s.id === activeSection) || sections[0],
    [activeSection]
  );

  // Section completion + overall progress. A block counts toward progress
  // when it's required (not optional) and has a non-empty value. A section
  // counts as complete when all its required blocks are filled. Optional
  // blocks (e.g. q_why_b, q_final_a) don't gate progress or section state.
  const { completedSections, percentComplete } = useMemo(() => {
    const completedSecs = new Set();
    let totalRequired = 0;
    let filledRequired = 0;

    function isFilled(value) {
      if (value === undefined || value === null) return false;
      if (typeof value === "string" && value.trim() === "") return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    }

    for (const section of sections) {
      let sectionRequired = 0;
      let sectionFilled = 0;
      for (const q of section.questions) {
        for (const b of q.blocks) {
          if (b.optional) continue;
          sectionRequired += 1;
          totalRequired += 1;
          if (isFilled(answers[b.id])) {
            sectionFilled += 1;
            filledRequired += 1;
          }
        }
      }
      if (sectionRequired > 0 && sectionFilled === sectionRequired) {
        completedSecs.add(section.id);
      }
    }

    const pct =
      totalRequired > 0
        ? Math.round((filledRequired / totalRequired) * 100)
        : 0;

    return { completedSections: completedSecs, percentComplete: pct };
  }, [answers]);

  // Scroll-triggered reveal for sections
  useEffect(() => {
    if (!showForm) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setRevealedSections((prev) => {
          let changed = false;
          const next = new Set(prev);
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const id = entry.target.dataset.sectionId;
              if (!next.has(id)) {
                next.add(id);
                changed = true;
              }
            }
          }
          return changed ? next : prev;
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 }
    );
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [showForm]);

  // Scroll-triggered reveal for individual questions within sections
  useEffect(() => {
    if (!showForm) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setRevealedQuestions((prev) => {
          let changed = false;
          const next = new Set(prev);
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const id = entry.target.dataset.questionId;
              if (!next.has(id)) {
                next.add(id);
                changed = true;
              }
            }
          }
          return changed ? next : prev;
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );
    Object.values(questionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [showForm]);

  function jumpTo(sectionId) {
    const el = sectionRefs.current[sectionId];
    if (el) {
      const top =
        el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  function handleStartReview() {
    setReviewing(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleEditFromReview(questionId) {
    setReviewing(false);
    // Wait for DOM repaint then scroll to the question
    setTimeout(() => {
      const el = questionRefs.current[questionId];
      if (el) {
        const top =
          el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 80);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Submission failed");
      }
      try {
        sessionStorage.setItem(SUBMITTED_KEY, "ok");
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err.message ||
          "Something went wrong. Please try again, or contact your Antenna Group contact."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return <ThankYou />;
  }

  if (!showForm) {
    return <Welcome onBegin={() => setShowForm(true)} />;
  }

  if (reviewing) {
    return (
      <ReviewPage
        answers={answers}
        onConfirm={handleSubmit}
        onEdit={handleEditFromReview}
        onBack={() => setReviewing(false)}
        submitting={submitting}
        submitError={submitError}
        contactEmail={CONTACT_EMAIL}
      />
    );
  }

  return (
    <>
      <Header saved={saved} percentComplete={percentComplete} />

      {/* Mobile section navigator. Visible below lg breakpoint where the rail is hidden. */}
      <div className="lg:hidden sticky top-[73px] z-20 bg-paper/95 backdrop-blur-md border-b border-rule-soft">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <span className="font-sans font-semibold text-[9px] uppercase tracking-[0.22em] text-ink-muted">
              Section {activeSectionObj.number}
            </span>
            <p className="font-sans font-bold text-sm text-ink leading-tight truncate">
              {activeSectionObj.title}
            </p>
          </div>
          <div className="flex flex-col items-end gap-0.5 shrink-0">
            <span className="font-sans font-bold text-[11px] tabular-nums text-ink">
              {percentComplete}%
            </span>
            <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-ink-muted">
              complete
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 lg:px-10 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)] gap-12 lg:gap-20">
          <ProgressRail
            sections={sections}
            activeId={activeSection}
            completedIds={completedSections}
            percentComplete={percentComplete}
            onJump={jumpTo}
          />

          <div className="max-w-wide w-full space-y-24">
            {sections.map((section, sIdx) => (
              <section
                key={section.id}
                ref={(el) => (sectionRefs.current[section.id] = el)}
                data-section-id={section.id}
                className={`space-y-12 section-reveal ${
                  revealedSections.has(section.id)
                    ? "section-reveal-active"
                    : ""
                }`}
              >
                <header className="pb-6 border-b border-rule">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-sans font-extrabold text-sm tabular-nums text-ink tracking-tight">
                      {section.number}
                    </span>
                    <span
                      className="flex-1 h-px bg-rule self-center grow-rule"
                      aria-hidden
                    ></span>
                    <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                      Section {section.number} of{" "}
                      {sections.length.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="font-sans font-black text-2xl md:text-3xl tracking-tight text-ink leading-[1.1] mb-3 uppercase">
                    {section.title}
                  </h2>
                  <p className="font-sans text-ink-soft text-base leading-relaxed max-w-[60ch]">
                    {section.blurb}
                  </p>
                </header>

                <div>
                  {section.questions.map((q, qIdx) => {
                    const qNum = String(
                      questionNumberMap[q.id]
                    ).padStart(2, "0");
                    return (
                      <div
                        key={q.id}
                        ref={(el) => (questionRefs.current[q.id] = el)}
                        data-question-id={q.id}
                        className={`q-reveal ${
                          revealedQuestions.has(q.id)
                            ? "q-reveal-active"
                            : ""
                        }`}
                      >
                        {qIdx > 0 && (
                          <div
                            className="my-16 h-px bg-rule-soft"
                            aria-hidden="true"
                          ></div>
                        )}
                        <div className="space-y-6">
                          <div className="flex items-baseline gap-3">
                            <span className="font-sans font-bold text-[10px] uppercase tracking-[0.22em] text-ink tabular-nums">
                              Question {qNum}
                            </span>
                            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-ink-muted tabular-nums">
                              of {totalQuestionsLabel}
                            </span>
                          </div>
                          <div className="space-y-3">
                            <h3 className="font-display text-xl md:text-2xl tracking-tightish text-ink leading-snug">
                              {q.prompt}
                            </h3>
                            {q.helper ? (
                              <p className="text-ink-soft text-sm leading-relaxed max-w-[60ch]">
                                {q.helper}
                              </p>
                            ) : null}
                          </div>
                          <div className="space-y-8 pt-2">
                            {q.blocks.map((block) => (
                              <QuestionBlock
                                key={block.id}
                                block={block}
                                value={answers[block.id]}
                                onChange={(v) =>
                                  setAnswer(block.id, v)
                                }
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}

            {/* Review & submit */}
            <div className="border-t border-rule pt-12 space-y-6 fade-in">
              <h2 className="font-sans font-black text-2xl md:text-3xl tracking-tight uppercase text-ink">
                Ready to send it through?
              </h2>
              <div className="space-y-2 text-ink-soft text-sm max-w-[60ch] leading-relaxed">
                <p>
                  We'll show you a one-page review of everything you said
                  before it goes anywhere. Edit, sharpen, then confirm.
                </p>
                <p>
                  Your responses go to the Antenna Group strategy team.
                  Nothing is attributed to you by name. Questions, or
                  anything you'd rather say in person:{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </div>
              <button
                type="button"
                onClick={handleStartReview}
                className="hover-lift inline-flex items-center gap-3 px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.18em] bg-ink text-paper rounded-sm hover:bg-ink-soft"
              >
                <span>Review your answers</span>
                <span className="nudge inline-block" aria-hidden>→</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function Welcome({ onBegin }) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/count", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (mounted && typeof d.count === "number") {
          setCount(d.count);
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen px-6 lg:px-10 py-12 lg:py-16 relative z-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14 reveal reveal-delay-1 flex items-center gap-5">
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

        <p className="font-sans font-semibold text-[11px] uppercase tracking-[0.22em] text-accent mb-6 reveal reveal-delay-2">
          SEPA &nbsp;/&nbsp; Brand Foundation Study
        </p>

        <h1 className="font-display text-4xl md:text-6xl tracking-tightish text-ink leading-[1.02] mb-8 reveal reveal-delay-2 text-balance">
          How you say it matters as much as what you say.
        </h1>

        <div className="space-y-3 text-ink-soft text-sm leading-relaxed max-w-[72ch] text-pretty reveal reveal-delay-3">
          <p>
            Antenna Group is working with SEPA on a rebrand, a new brand
            foundation, and a redesign of both the SEPA and PUF websites.
            Before we put more language on paper, we want to ground the work
            in how the people closest to SEPA describe it: what it does, what
            would be lost without it, where the name helps and where it gets
            in the way, and what neutrality is really worth.
          </p>
          <p>
            We are listening as much for phrasing as for content. Two people
            can agree completely on what SEPA does and describe it in words
            that would build different organizations. So write the way you
            speak. Where you disagree with the conventional view, say so.
            Rough and true beats polished and general.
          </p>
          <p>
            Responses go to the Antenna Group strategy team and feed straight
            into the Diagnose findings. Nothing is attributed to you by name.
          </p>
        </div>

        <div className="mt-10 border-t border-rule pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 reveal reveal-delay-4">
          <MetaCell
            label="Time"
            value="Around 12 minutes"
          />
          <MetaCell
            label="Format"
            value="Short writes, sliders, one story"
          />
          <MetaCell
            label="Progress"
            value="Saved as you go"
          />
        </div>

        <div className="mt-10 reveal reveal-delay-5 space-y-5">
          <CountIndicator count={count} />
          <button
            type="button"
            onClick={onBegin}
            className="hover-lift group inline-flex items-center gap-3 px-9 py-4 font-sans text-sm font-semibold uppercase tracking-[0.18em] bg-ink text-paper rounded-sm hover:bg-ink-soft"
          >
            <span>Begin</span>
            <span className="nudge inline-block" aria-hidden>→</span>
          </button>
        </div>

        <p className="mt-14 font-sans text-[10px] uppercase tracking-[0.22em] text-ink-muted reveal reveal-delay-6">
          <a
            href="https://antennagroup.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink-soft underline decoration-rule/0 hover:decoration-rule underline-offset-4 transition-colors"
          >
            Antenna Group
          </a>
          &nbsp;·&nbsp; Brand &amp; Communications Strategy
        </p>
      </div>
    </div>
  );
}

function MetaCell({ label, value }) {
  return (
    <div>
      <p className="font-sans font-semibold text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-2">
        {label}
      </p>
      <p className="text-ink text-sm leading-snug">
        {value}
      </p>
    </div>
  );
}

function CountIndicator({ count }) {
  // Loading or unavailable: render nothing so the layout stays clean.
  if (count === null || count === undefined) return null;

  if (count === 0) {
    return (
      <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-ink-muted">
        Be among the first to weigh in.
      </p>
    );
  }

  return (
    <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-ink-muted">
      <span className="font-bold text-ink tabular-nums">{count}</span>{" "}
      {count === 1 ? "voice" : "voices"} already on the record. Add yours.
    </p>
  );
}

function ThankYou() {
  return (
    <div className="min-h-screen px-6 lg:px-10 py-24 relative z-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-20 reveal reveal-delay-1 flex items-center gap-5">
          <img
            src="https://ktuyiikwhspwmzvyczit.supabase.co/storage/v1/object/public/assets/brand/antenna-new-logo.svg"
            alt="Antenna Group"
            className="h-12 w-auto"
          />
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

        <p className="font-sans font-semibold text-[11px] uppercase tracking-[0.22em] text-accent mb-6 reveal reveal-delay-2">
          SEPA &nbsp;/&nbsp; Brand Foundation Study
        </p>

        <h1 className="font-display text-5xl md:text-6xl tracking-tightish text-ink leading-[1.02] mb-8 reveal reveal-delay-2 text-balance">
          Thank you. We've got it.
        </h1>

        <div className="space-y-4 text-ink-soft text-base leading-relaxed max-w-[72ch] text-pretty reveal reveal-delay-3">
          <p>
            Your responses are with the Antenna Group strategy team. They
            will be read closely, set alongside the interviews and the other
            written responses, and used to build the brand foundation for
            SEPA and PUF.
          </p>
          <p>
            You can close this window. If something occurs to you later,
            send it to your Antenna Group contact and we will fold it in.
          </p>
        </div>
      </div>
    </div>
  );
}
