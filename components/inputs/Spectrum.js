"use client";

// Spectrum slider.
//
// Two things this needs to do that the plain range input did not:
// 1. Look unmistakably like something you drag. The track is filled to
//    the left of the thumb, the end labels are tappable, and an
//    untouched slider carries an explicit "drag to place" instruction.
// 2. Distinguish "placed in the middle" from "never touched". The old
//    version defaulted to 50 and looked identical either way, which
//    manufactured false centrism in the data. Until the respondent
//    interacts, the value stays undefined and the control says so.

export default function Spectrum({ block, value, onChange }) {
  const placed = value !== undefined && value !== null;
  const v = placed ? value : block.default;

  let lean = "";
  if (v <= 10) lean = "fully toward " + block.leftLabel.toLowerCase();
  else if (v <= 30) lean = "strongly toward " + block.leftLabel.toLowerCase();
  else if (v <= 45) lean = "leaning " + block.leftLabel.toLowerCase();
  else if (v <= 55) lean = "right in the middle";
  else if (v <= 70) lean = "leaning " + block.rightLabel.toLowerCase();
  else if (v <= 90) lean = "strongly toward " + block.rightLabel.toLowerCase();
  else lean = "fully toward " + block.rightLabel.toLowerCase();

  const pct = ((v - block.min) / (block.max - block.min)) * 100;

  return (
    <div className="space-y-3 py-3">
      {/* End labels sit above the track and are clickable, so the
          relationship between label and position is obvious. */}
      <div className="flex justify-between gap-6 text-sm">
        <button
          type="button"
          onClick={() => onChange(block.min)}
          className="text-left text-ink-soft max-w-[45%] leading-snug hover:text-ink transition-colors"
        >
          {block.leftLabel}
        </button>
        <button
          type="button"
          onClick={() => onChange(block.max)}
          className="text-right text-ink-soft max-w-[45%] leading-snug hover:text-ink transition-colors"
        >
          {block.rightLabel}
        </button>
      </div>

      <div className="relative pt-1 pb-1">
        <input
          id={block.id}
          type="range"
          min={block.min}
          max={block.max}
          value={v}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          aria-label={`${block.leftLabel} to ${block.rightLabel}`}
          aria-valuetext={placed ? lean : "not yet placed"}
          className={`spectrum-range block w-full ${
            placed ? "is-placed" : "is-unplaced"
          }`}
          style={{ "--fill": `${pct}%` }}
        />
        {/* Midpoint tick, so the centre is a visible position rather
            than a guess. */}
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-px bg-rule-soft"
          aria-hidden
        />
      </div>

      <div className="text-center min-h-[18px]">
        {placed ? (
          <span className="text-xs text-ink-soft">
            <span className="font-display text-base text-ink tabular-nums mr-2">
              {v}
            </span>
            <span className="italic">{lean}</span>
          </span>
        ) : (
          <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            ← Drag to place ​→
          </span>
        )}
      </div>
    </div>
  );
}
