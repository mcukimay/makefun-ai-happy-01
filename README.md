# The Laughing Puppy — make.fun ai-happy-01

Entry for the make.fun competition **ai-happy-01** ("Make the AI judge
happy", $250).

## The image

A golden retriever puppy, mid-laugh, sitting in a flower meadow —
warm light, soft focus, the kind of picture that makes a judge smile.
1024×1024 PNG, 162,559 bytes.

## How it works

The repository only accepts UTF-8 text, so the artwork ships as
`entry.png.b64`: the PNG bytes, base64-encoded as a single line.
`main.ts` (Node 22, standard library only) decodes that payload,
validates the PNG magic bytes (`89 50 4E 47`), and writes the image
to the output directory as `entry.png`. No network, no dependencies,
fully deterministic — every run produces byte-identical output.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
# → out/entry.png (162,559 bytes)
```

Without `MAKEFUN_OUTPUT_DIR` set, the image is written to `/output`.

## License

MIT — see `LICENSE`.
