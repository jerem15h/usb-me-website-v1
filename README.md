# usb-me

Marketing site for **usb-me**, a personal intelligence that lives on your phone,
powered by NVIDIA Nemotron running on the device.

Built with Next.js 16, React 19 and Tailwind v4.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## How the site is put together

Design tokens live in `app/globals.css`. The page is paper and ink: a warm off
white `#f8f8f3` with pure black type. There is no accent hue anywhere. All
hierarchy comes from alpha on black, so muted text is black at 60 percent and
hairlines are black at 14 percent.

Contrast comes from whole blocks turning over rather than from grey bands. The
`.ink-block` class flips every token to its inverse and paints the block black,
so any component dropped inside it adapts with no extra styling. The pipeline,
the control section and the footer use it. Do not rename this class to
`invert`, which collides with a Tailwind filter utility.

Note that `--signal` is redeclared inside `.ink-block`. Custom properties
resolve where they are declared, not where they are used, so a token that
points at `--foreground` has to be restated in any scope that redefines it.

## Motion

Everything eases off two tokens, `--ease` and `--ease-out`. The gestures, in
rough order of how loud they are:

- `MaskText` splits a heading into words and lifts each one from behind its own
  baseline when the heading arrives. It is used on headings only, so the gesture
  stays rare enough to mean something.
- The ladder is a stack of sticky frames. Each card pins 26px lower than the one
  before, so the previous cards leave a visible lip carrying their label, and
  the whole ladder reads as a stack by the time you reach the bottom. A single
  rAF throttled scroll listener scales and fades each card as the next one
  covers it, which is what makes the stack feel physical rather than merely
  overlapping.
- `ParallaxImage` holds the frame still and drifts the picture inside it.
- `Counter` and `ProgressBar` run once when they arrive.
- The memory graph draws its own edges with `stroke-dashoffset`, then fades the
  nodes in behind them.
- The nav carries a hairline scroll progress bar along its lower edge.
- `.reveal` remains the quiet default for body copy.

Every one of these checks `prefers-reduced-motion` and renders its finished
state when it is set.

Sections, in page order (`app/page.tsx`):

| Component | What it is |
| --- | --- |
| `hero.tsx` plus `trace.tsx` | The headline, and the signature moment: a looping voice to work trace showing one spoken sentence resolving into the work it actually does. |
| `thesis.tsx` | Why the intelligence should be yours. |
| `ladder.tsx` | Command, request, goal. The rungs escalate by how much reasoning each one asks for. |
| `pipeline.tsx` | The interactive walkthrough. Six stages you can play or step through, drawn inside the phone boundary, with the one step that reaches outside marked. |
| `memory.tsx` | Interactive knowledge graph. Hover or focus a node to light its links. |
| `device.tsx` | What stays on the phone, and what still works with no connection. |
| `workspace.tsx` | A workspace as the intelligence holds it. |
| `control.tsx` | The three network modes, as a control you can operate. |
| `access.tsx` | Early access capture. |

Everything respects `prefers-reduced-motion`: the trace jumps to its finished
state, the pipeline stops auto advancing, the ambient gradients hold still, and
the reveals are inert.

## Copy rules

Plain, grounded language. No hyphens or dashes in prose. The product name
`usb-me` is the one exception, because it is a name.

## Not wired up yet

The email form in `access.tsx` only sets local state. It needs a real endpoint
before launch.
