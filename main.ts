// make.fun ai-happy-01 entry — "The Laughing Puppy".
// Node 22, standard library only. No network, no dependencies.
//
// The artwork ships as entry.png.b64 beside this file: the PNG bytes
// of the image, base64-encoded as a single line (the repo only takes
// UTF-8 text, so the picture travels as text). This program decodes
// that payload, checks it really is a PNG, and writes it to the
// output directory as entry.png.
//
// Usage:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The decode is deterministic: every run writes byte-identical PNGs.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Where the grader expects the artifact. The platform sets
// MAKEFUN_OUTPUT_DIR; fall back to /output when it is absent.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

// The payload lives next to this entrypoint, wherever it is checked out.
const here = dirname(fileURLToPath(import.meta.url));
const payloadPath = join(here, 'entry.png.b64');
const encoded = readFileSync(payloadPath, 'utf8').trim();

if (encoded.length === 0) {
  throw new Error('entry.png.b64 is empty');
}

const bytes = Buffer.from(encoded, 'base64');
if (bytes.length === 0) {
  throw new Error('entry.png.b64 decoded to 0 bytes');
}

// A PNG always starts with 89 50 4E 47. If the payload does not,
// something is corrupt — fail loudly instead of writing junk.
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
const head = bytes.subarray(0, 4);
if (!head.equals(pngMagic)) {
  throw new Error('entry.png.b64 did not decode to PNG bytes');
}

const target = join(outDir, 'entry.png');
writeFileSync(target, bytes);
console.log(`wrote ${target} (${bytes.length} bytes)`);
