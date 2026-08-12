"use client";

export default function SingleSelect({ block, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-ink leading-snug">
        {block.label}
      </label>
      <div className="flex flex-wrap gap-2">
        {block.options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              type="button"
              key={opt}
              onClick={() => onChange(opt)}
              className={`px-4 py-2 text-sm rounded-sm border transition-all ${
                selected
                  ? "bg-ink text-paper border-ink"
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
