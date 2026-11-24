import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const line =
  "v3.1.0: fixed a bug where the phone battery drops from 20% to 1% the second you leave the house.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");

// Read back and verify the gate: 1-160 UTF-8 characters, not only whitespace.
const back = readFileSync("/output/entry.txt", "utf8");
if (back.length < 1 || back.length > 160 || back.trim().length === 0) {
  throw new Error(
    `entry.txt failed verification: ${back.length} characters, expected 1-160 non-whitespace characters.`,
  );
}
if (back !== line) {
  throw new Error("entry.txt does not match the patch note exactly.");
}
console.log(`Wrote ${back.length}-character patch note to /output/entry.txt`);
