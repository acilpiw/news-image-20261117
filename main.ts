// news-image-20261117: one-day world news in one image.
// Tuesday 17 November 2026 — Kerch bridge, Xi-Putin-Trump at APEC,
// US chip curbs, Gaza aid, Depardieu, Japan jets, Yemen / Rwanda.
// The image is entry.png beside this file (1024x1024 PNG, < 1 MiB).
// This program copies it to the grader's output directory, unchanged,
// so both runs write byte-identical files. A SHA-256 guard refuses to
// write anything else: if entry.png ever changes, the run fails loudly
// instead of submitting a different picture.
//
// Run locally:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// SHA-256 of entry.png as built in this session (1024x1024, 703337 bytes).
const EXPECTED_SHA256 =
  "e30753a2337f2c4631bc6e3db671583f8a4804a856ecb62231f70561cbfb5b52";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
const bytes = readFileSync(source);
const digest = createHash("sha256").update(bytes).digest("hex");
if (digest !== EXPECTED_SHA256) {
  throw new Error(
    `entry.png sha256 mismatch: got ${digest}, expected ${EXPECTED_SHA256}`,
  );
}
writeFileSync(target, bytes);
