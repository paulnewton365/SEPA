"use client";

export default function Spectrum({ block, value, onChange }) {
  const v = value === undefined || value === null ? block.default : value;
  // Compute a soft "lean" descriptor for the value, so the indicator has
  // tonal meaning rather than just being a bare number.
  let lean = "";
  if (v <= 10) lean = "fully toward " + block.leftLabel.toLowerCase();
  else if (v <= 30) lean = "strongly toward " + block.leftLabel.toLowerCase();
  else if (v <= 45) lean = "leaning " + block.leftLabel.toLowerCase();
  else if (v <= 55) lean = "right in the middle";
  else if (v <= 70) lean = "leaning " + block.rightLabel.toLowerCase();
  else if (v <= 90) lean = "strongly toward " + block.rightLabel.toLowerCase();
  else lean = "fully toward " + block.rightLabel.toLowerCase();

  return (
    <div className="space-y-3 py-2">
      <div className="text-center">
        <span className="font-display text-base text-ink tabular-nums">
          {v}
        </span>
        <span className="text-xs text-ink-muted ml-2 italic">{lean}</span>
      </div>
      <input
        id={block.id}
        type="range"
        min={block.min}
        max={block.max}
        value={v}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="block w-full"
      />
      <div className="flex justify-between gap-6 text-sm">
        <span className="text-ink-soft max-w-[45%]">{block.leftLabel}</span>
        <span className="text-ink-soft max-w-[45%] text-right">
          {block.rightLabel}
        </span>
      </div>
    </div>
  );
}
