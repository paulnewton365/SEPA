"use client";

export default function WordBank({ block, value, onChange }) {
  const selected = Array.isArray(value) ? value : [];
  const max = block.max_selected || 5;
  const atMax = selected.length >= max;

  function toggle(opt) {
    if (selected.includes(opt)) {
      onChange(selected.filter((o) => o !== opt));
      return;
    }
    if (atMax) return;
    onChange([...selected, opt]);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <label className="block text-sm font-medium text-ink leading-snug">
          {block.label}
        </label>
        <span className="text-xs tracking-wide text-ink-muted">
          {selected.length} of {max} chosen
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {block.options.map((opt) => {
          const isSelected = selected.includes(opt);
          const disabled = !isSelected && atMax;
          return (
            <button
              type="button"
              key={opt}
              onClick={() => toggle(opt)}
              disabled={disabled}
              className={`px-3.5 py-1.5 text-sm rounded-full border transition-all ${
                isSelected
                  ? "bg-ink text-paper border-ink"
                  : disabled
                  ? "bg-transparent text-ink-muted/40 border-rule/50 cursor-not-allowed"
                  : "bg-transparent text-ink-soft border-rule hover:border-ink hover:text-ink"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
