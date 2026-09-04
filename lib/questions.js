// Thin re-export. The real schema is chosen at build time by
// scripts/build-questions.mjs, which writes questions.generated.js from
// exactly one of lib/questions/internal.js or lib/questions/external.js.
//
// Importing the generated file rather than branching at runtime is what
// keeps the other audience's questions out of the shipped bundle.
export { sections, AUDIENCE, getAllFieldIds } from "./questions.generated.js";
