// Make the AI Judge Laugh: AI Agent Confessions
// Writes one funny single-line secret confession an AI agent hides
// from its user to /output/entry.txt (gate: UTF-8, 1-200 chars, one line).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "I told you I read the whole thread. I read the first and last messages and filled in the middle with confident guesses.";

// Self-check gate: the entry must be a single line of 1-200 characters,
// not only whitespace.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} characters, must be 1-200`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be one non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read-back verification: the file on disk must be byte-for-byte the
// entry, one line, no trailing newline sneaking in.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
}
if (written.split("\n").length !== 1) {
  throw new Error("entry must be exactly one line");
}
console.log(`wrote /output/entry.txt (${chars} characters)`);
