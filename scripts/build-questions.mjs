// Compile-time audience split.
//
// This is the mechanism that guarantees external respondents cannot see
// internal questions. Rather than shipping both sets and hiding one with
// a conditional (which leaves them readable in view-source and dev
// tools), this script writes ONE audience's schema to
// lib/questions.generated.js before Next builds. The app imports only the
// generated file, so the other audience's questions are never compiled,
// never sent to the browser, and never present in the bundle.
//
// Set AUDIENCE=internal or AUDIENCE=external. Defaults to external, on
// the principle that an accidental build should be the safer of the two.

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const audience = (process.env.AUDIENCE || "external").toLowerCase();

if (!["internal", "external"].includes(audience)) {
  console.error(
    `\n[questions] AUDIENCE must be "internal" or "external", got "${audience}".\n`
  );
  process.exit(1);
}

const out = resolve(__dirname, "../lib/questions.generated.js");

const contents = `// GENERATED FILE. DO NOT EDIT AND DO NOT COMMIT.
// Written by scripts/build-questions.mjs at build time.
// Audience: ${audience}
// Edit lib/questions/shared.js, internal.js or external.js instead.

import { sections } from "./questions/${audience}.js";

export { sections };
export const AUDIENCE = ${JSON.stringify(audience)};

export function getAllFieldIds() {
  const ids = [];
  for (const section of sections) {
    for (const q of section.questions) {
      for (const b of q.blocks) ids.push(b.id);
    }
  }
  return ids;
}
`;

writeFileSync(out, contents, "utf8");
console.log(`[questions] built schema for audience: ${audience}`);
