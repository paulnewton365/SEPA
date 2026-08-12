"use client";

export default function MultiSelect({ block, value, onChange }) {
  const selected = Array.isArray(value) ? value : [];

  function toggle(opt) {
    if (selected.includes(opt)) {
      onChange(selected.filter((o) => o !== opt));
    } else {
      onChange([...selected, opt]);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-ink leading-snug">
        {block.label}
      </label>
      <div className="flex flex-wrap gap-2">
        {block.options.map((opt) => {
          const isSelected = selected.includes(opt);
          return (
            <button
              type="button"
              key={opt}
              onClick={() => toggle(opt)}
              className={`px-4 py-2 text-sm rounded-sm border transition-all ${
                isSelected
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
