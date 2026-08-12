"use client";

export default function Slider({ block, value, onChange }) {
  const v = value === undefined || value === null ? block.default : value;

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={block.id}
          className="block text-sm font-medium text-ink leading-snug"
        >
          {block.label}
        </label>
        <span className="font-display text-xl text-ink tabular-nums">
          {v}
        </span>
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
      <div className="flex justify-between text-[11px] uppercase tracking-widest text-ink-muted">
        <span>{block.min}</span>
        <span>{block.max}</span>
      </div>
    </div>
  );
}
