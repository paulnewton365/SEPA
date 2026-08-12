"use client";

export function countWords(str) {
  if (!str) return 0;
  const trimmed = str.trim();
  if (trimmed.length === 0) return 0;
  return trimmed.split(/\s+/).length;
}

export default function WordCount({ value, min, max }) {
  const n = countWords(value);
  let tone = "text-ink-muted";
  let message = "";

  if (min && n > 0 && n < min) {
    tone = "text-accent";
    message = `${n} of ${min} suggested`;
  } else if (max && n > max) {
    tone = "text-accent";
    message = `${n} of ${max} max`;
  } else if (min || max) {
    if (min && max) message = `${n} words (${min} to ${max})`;
    else if (max) message = `${n} of ${max} words`;
    else message = `${n} words`;
  } else {
    message = `${n} words`;
  }

  return (
    <span className={`text-xs tracking-wide ${tone}`}>{message}</span>
  );
}
