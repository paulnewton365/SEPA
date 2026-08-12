"use client";

export default function Header({ saved, percentComplete = 0 }) {
  return (
    <header className="border-b border-rule bg-paper/85 backdrop-blur-md sticky top-0 z-30">
      {/* Progress bar across the top of the header. Animates as the user
          fills in required answers. */}
      <div
        className="relative h-1 w-full bg-rule-soft/40 overflow-hidden"
        role="progressbar"
        aria-label="Questionnaire progress"
        aria-valuenow={percentComplete}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="absolute inset-y-0 left-0 bg-ink transition-all duration-700 ease-out"
          style={{ width: `${percentComplete}%` }}
        />
      </div>
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <a
            href="/"
            className="block hover-lift"
            aria-label="SEPA Brand Foundation Study home"
          >
            <img
              src="https://ktuyiikwhspwmzvyczit.supabase.co/storage/v1/object/public/assets/brand/antenna-new-logo.svg"
              alt="Antenna Group"
              className="h-8 w-auto"
            />
          </a>
          <span className="hidden sm:block h-6 w-px bg-rule" aria-hidden />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-sans font-bold uppercase tracking-[0.18em] text-[10px] text-ink">
              SEPA
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-ink-muted mt-0.5">
              Brand Foundation Study
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://antennagroup.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-block font-sans text-[10px] uppercase tracking-[0.22em] text-ink-muted hover:text-ink underline decoration-rule/0 hover:decoration-rule underline-offset-4 transition-colors"
          >
            antennagroup.com ↗
          </a>
          <div className="font-sans text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            {saved ? (
              <span className="flex items-center gap-2">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-ink"
                  aria-hidden
                />
                Saved
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-accent ink-pulse"
                  aria-hidden
                />
                Editing
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
