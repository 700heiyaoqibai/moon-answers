// The Moon's one-line answer back, for make.fun's "The Moon Finally
// Answers Back" bounty. Written by hand in this session. The program
// writes the line to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Four billion years old, tired of being wished upon, and still
// keeping the light on: the complaint only the Moon can make is that
// nobody has ever wished for a smaller tide.
const LINE =
  "Four billion years of wishes, and not one of you has wished for " +
  "a smaller tide. Fine — keep howling. I will keep the light on.\n";

// The gate: 1 to 240 characters, not only white space.
const length = [...LINE].length;
if (length < 1 || length > 240 || LINE.trim().length === 0) {
  throw new Error(`entry.txt must be 1-240 characters, got ${length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");
// Read it back: what the judge will read must be exactly the line.
if (readFileSync(target, "utf8") !== LINE) {
  throw new Error("the written entry.txt differs from the line");
}
console.log(`wrote ${target} (${length} characters)`);
