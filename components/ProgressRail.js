"use client";

export default function ProgressRail({
  sections,
  activeId,
  completedIds,
  percentComplete = 0,
  onJump,
}) {
  return (
    <nav
      aria-label="Sections"
      className="hidden lg:block sticky top-28 self-start space-y-3"
    >
      <div className="flex items-baseline justify-between mb-5">
        <p className="font-sans font-semibold text-[10px] uppercase tracking-[0.22em] text-ink-muted">
          Sections
        </p>
        <p className="font-sans font-bold text-[11px] tabular-nums text-ink">
          {percentComplete}%
        </p>
      </div>
      <ol className="space-y-4">
        {sections.map((s) => {
          const active = s.id === activeId;
          const complete = completedIds.has(s.id);
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onJump(s.id)}
                className={`group flex items-baseline gap-3 text-left w-full transition-all duration-300 ${
                  active ? "rail-item-active pl-0" : ""
                }`}
              >
                <span className="relative inline-flex items-center justify-center w-5 h-5 mt-0.5 self-start">
                  {complete ? (
                    <span
                      className="block w-2 h-2 rounded-full bg-ink"
                      aria-label="Complete"
                    ></span>
                  ) : (
                    <span
                      className={`block w-2 h-2 rounded-full border ${
                        active
                          ? "border-ink bg-paper"
                          : "border-ink-muted/40 bg-transparent"
                      }`}
                      aria-hidden
                    ></span>
                  )}
                </span>
                <span
                  className={`font-sans font-bold text-sm tabular-nums transition-colors ${
                    active || complete ? "text-ink" : "text-ink-muted/50"
                  }`}
                >
                  {s.number}
                </span>
                <span
                  className={`font-sans text-sm leading-snug transition-colors ${
                    active
                      ? "text-ink font-semibold"
                      : complete
                      ? "text-ink-soft"
                      : "text-ink-muted/70 group-hover:text-ink-soft"
                  }`}
                >
                  {s.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
