"use client";

import { sections } from "../lib/questions";
import Header from "./Header";

function formatValue(block, value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return null;
    return value.join(", ");
  }
  if (block.type === "spectrum") {
    const left = block.leftLabel || "Left";
    const right = block.rightLabel || "Right";
    const num = Number(value);
    let position = "centered";
    if (num < 25) position = `closer to "${left}"`;
    else if (num < 45) position = `leaning toward "${left}"`;
    else if (num <= 55) position = "right in the middle";
    else if (num <= 75) position = `leaning toward "${right}"`;
    else position = `closer to "${right}"`;
    return `${num} of 100 (${position})`;
  }
  return String(value);
}

export default function ReviewPage({
  answers,
  onConfirm,
  onEdit,
  onBack,
  submitting,
  submitError,
  contactEmail,
}) {
  return (
    <>
      <Header saved={true} />
      <main className="max-w-3xl mx-auto px-6 lg:px-10 py-12 lg:py-16 relative z-10">
        <div className="mb-12 fade-in">
          <p className="font-sans font-semibold text-[11px] uppercase tracking-[0.22em] text-accent mb-4">
            Final step
          </p>
          <h1 className="font-display text-4xl md:text-5xl tracking-tightish text-ink leading-[1.05] mb-4">
            Review your answers.
          </h1>
          <p className="text-ink-soft text-base leading-relaxed max-w-[58ch]">
            Take a moment to read back what you've said. Edit anything that
            needs sharpening, then send it through.
          </p>
        </div>

        <div className="space-y-14">
          {sections.map((section) => (
            <section
              key={section.id}
              className="border-t border-rule pt-8"
            >
              <header className="mb-8">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-sans font-bold text-xs tabular-nums text-ink">
                    {section.number}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                    Section {section.number}
                  </span>
                </div>
                <h2 className="font-sans font-black text-xl md:text-2xl uppercase tracking-tight text-ink">
                  {section.title}
                </h2>
              </header>

              <div className="space-y-10">
                {section.questions.map((q) => (
                  <div key={q.id} className="space-y-3">
                    <div className="flex items-start justify-between gap-6">
                      <h3 className="font-display text-lg md:text-xl tracking-tightish text-ink leading-snug max-w-[55ch]">
                        {q.prompt}
                      </h3>
                      <button
                        type="button"
                        onClick={() => onEdit(q.id)}
                        className="shrink-0 font-sans font-semibold text-[10px] uppercase tracking-[0.22em] text-ink-muted underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-ink transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="space-y-4 pt-1">
                      {q.blocks.map((block) => {
                        const formatted = formatValue(
                          block,
                          answers[block.id]
                        );
                        return (
                          <div key={block.id} className="space-y-1.5">
                            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                              {block.label}
                            </p>
                            {formatted ? (
                              <p
                                className={`text-ink leading-relaxed ${
                                  block.type === "textarea"
                                    ? "text-base whitespace-pre-wrap"
                                    : "text-base"
                                }`}
                              >
                                {formatted}
                              </p>
                            ) : (
                              <p className="font-sans text-sm italic text-ink-muted">
                                {block.optional
                                  ? "Left blank (optional)"
                                  : "Not answered"}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-rule pt-10 space-y-6">
          <div className="space-y-2 text-sm text-ink-soft leading-relaxed max-w-[58ch]">
            <p>
              Your responses go to the Antenna Group strategy team. Nothing
              is attributed to you by name in any findings readout.
            </p>
            <p>
              Questions, or anything you'd rather say in person:{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
              >
                {contactEmail}
              </a>
              .
            </p>
          </div>
          {submitError ? (
            <p className="text-accent text-sm">{submitError}</p>
          ) : null}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <button
              type="button"
              onClick={onConfirm}
              disabled={submitting}
              className="hover-lift px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.18em] bg-ink text-paper rounded-sm hover:bg-ink-soft disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Confirm and submit"}
            </button>
            <button
              type="button"
              onClick={onBack}
              disabled={submitting}
              className="font-sans text-sm text-ink-muted hover:text-ink underline decoration-rule underline-offset-4 hover:decoration-ink disabled:opacity-50 transition-colors"
            >
              Back to edit
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
