"use client";

import WordCount from "./WordCount";

export default function TextField({ block, value, onChange }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={block.id}
          className="block text-sm font-medium text-ink leading-snug"
        >
          {block.label}
          {block.optional ? (
            <span className="ml-2 text-xs font-normal text-ink-muted">
              optional
            </span>
          ) : null}
        </label>
        {block.minWords || block.maxWords ? (
          <WordCount
            value={value || ""}
            min={block.minWords}
            max={block.maxWords}
          />
        ) : null}
      </div>
      <input
        id={block.id}
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={block.placeholder || ""}
        className="w-full bg-paper-tint/50 border border-rule-soft rounded-sm px-4 py-3 text-base text-ink placeholder:text-ink-muted/60 transition-colors focus:border-ink focus:bg-paper-tint/70 hover:bg-paper-tint/60"
      />
    </div>
  );
}
