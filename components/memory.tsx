'use client'

import { useState } from 'react'
import { MaskText } from '@/components/mask-text'
import { Reveal } from '@/components/reveal'
import { useInView } from '@/lib/use-in-view'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { SectionLabel } from '@/components/section-label'

type NodeId =
  | 'you' | 'sarah' | 'abdou' | 'project' | 'demo' | 'goal' | 'decision' | 'doc'

const nodes: Record<
  NodeId,
  { x: number; y: number; label: string; kind: string; detail: string }
> = {
  you: { x: 268, y: 206, label: 'You', kind: 'Person', detail: 'The centre of the graph. Everything it knows hangs off you.' },
  sarah: { x: 92, y: 96, label: 'Sarah', kind: 'Person', detail: 'Works with you on the benchmark. You owe her the latency numbers.' },
  abdou: { x: 84, y: 306, label: 'Abdou', kind: 'Person', detail: 'Builds the voice pipeline. Waiting on your review since Tuesday.' },
  project: { x: 262, y: 62, label: 'Nemotron benchmark', kind: 'Project', detail: 'Running since August. Two people, four open tasks, one blocker.' },
  demo: { x: 460, y: 112, label: 'Investor demo', kind: 'Event', detail: 'Thursday at 9 in the morning. Thirty minutes. Needs the benchmark done.' },
  goal: { x: 470, y: 292, label: 'Beta by 20 Oct', kind: 'Goal', detail: 'Your deadline. It plans backwards from here when you ask what to do.' },
  decision: { x: 278, y: 356, label: 'Use Nemotron Nano', kind: 'Decision', detail: 'Made on 2 September, because it fits in memory on an iPhone 15.' },
  doc: { x: 104, y: 200, label: 'Latency results', kind: 'Document', detail: 'Saved on your phone. It read this, so it can answer questions about it.' },
}

const edges: { a: NodeId; b: NodeId }[] = [
  { a: 'you', b: 'sarah' },
  { a: 'you', b: 'abdou' },
  { a: 'you', b: 'project' },
  { a: 'sarah', b: 'project' },
  { a: 'abdou', b: 'project' },
  { a: 'project', b: 'demo' },
  { a: 'project', b: 'goal' },
  { a: 'you', b: 'goal' },
  { a: 'project', b: 'decision' },
  { a: 'you', b: 'doc' },
  { a: 'doc', b: 'project' },
]

export function Memory() {
  const [active, setActive] = useState<NodeId | null>(null)
  const reduced = useReducedMotion()
  const { ref: figureRef, inView } = useInView<HTMLElement>('0px 0px -20% 0px')
  const drawn = reduced || inView

  const isLit = (id: NodeId) =>
    !active ||
    active === id ||
    edges.some(
      (e) => (e.a === active && e.b === id) || (e.b === active && e.a === id),
    )

  const current = active ? nodes[active] : null

  return (
    <section id="memory" className="rail rail-edges border-t py-24 md:py-32">
      <div className="grid gap-14 px-5 sm:px-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
        <Reveal>
          <SectionLabel>Memory</SectionLabel>
        </Reveal>
        <MaskText
          className="display-sm mt-7 max-w-[16ch] text-[clamp(2rem,4.6vw,3.4rem)]"
          delay={80}
        >
          It knows how your world fits together.
        </MaskText>
        <Reveal delay={200}>
          <p className="max-w-[46ch] text-[18px] leading-[1.65] text-muted-foreground">
            Not a long history of everything you ever typed. usb-me keeps a real
            picture of your life. People, projects, goals, documents, decisions,
            promises, and how they connect. That is what lets it answer where
            did we leave off without you explaining anything.
          </p>
          <p className="mt-5 max-w-[46ch] text-[18px] leading-[1.65] text-foreground">
            You can read all of it, fix it, or delete it. It lives on your
            phone, and it comes with you when the models get better.
          </p>
        </Reveal>
        </div>

        <Reveal delay={120} className="md:col-span-7">
          <figure
            ref={figureRef}
            className="surface overflow-hidden rounded-xl"
            onMouseLeave={() => setActive(null)}
          >
            <svg
              viewBox="0 0 560 420"
              className="w-full"
              role="img"
              aria-label="A piece of a personal knowledge graph linking people, a project, a demo, a goal, a decision and a document."
            >
              {edges.map((e, i) => {
                const A = nodes[e.a]
                const B = nodes[e.b]
                const touched = active === e.a || active === e.b
                const length = Math.hypot(B.x - A.x, B.y - A.y)
                return (
                  <line
                    key={`${e.a}-${e.b}`}
                    x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                    stroke={touched ? 'var(--signal)' : 'var(--line-hi)'}
                    strokeWidth={touched ? 1.5 : 1}
                    opacity={active && !touched ? 0.22 : 1}
                    strokeDasharray={length}
                    strokeDashoffset={drawn ? 0 : length}
                    style={{
                      transition: [
                        'stroke 500ms var(--ease)',
                        'opacity 500ms var(--ease)',
                        'stroke-width 500ms var(--ease)',
                        reduced
                          ? 'none'
                          : `stroke-dashoffset 900ms var(--ease-out) ${i * 70}ms`,
                      ].join(', '),
                    }}
                  />
                )
              })}

              {(Object.keys(nodes) as NodeId[]).map((id) => {
                const n = nodes[id]
                const lit = isLit(id)
                const isActive = active === id
                return (
                  <g
                    key={id}
                    tabIndex={0}
                    role="button"
                    aria-label={`${n.label}, ${n.kind}`}
                    onMouseEnter={() => setActive(id)}
                    onFocus={() => setActive(id)}
                    onBlur={() => setActive(null)}
                    style={{
                      cursor: 'pointer',
                      opacity: drawn ? (lit ? 1 : 0.2) : 0,
                      transition: reduced
                        ? 'none'
                        : `opacity 600ms var(--ease) ${drawn ? 520 : 0}ms`,
                    }}
                  >
                    <circle
                      cx={n.x} cy={n.y} r={isActive ? 6.5 : 4}
                      fill={isActive ? 'var(--signal)' : 'var(--foreground)'}
                      style={{ transition: 'r 400ms var(--ease-out), fill 400ms var(--ease)' }}
                    />
                    <text
                      x={n.x} y={n.y - 15}
                      textAnchor="middle"
                      fill={isActive ? 'var(--foreground)' : 'var(--muted-foreground)'}
                      fontSize="13.5"
                      fontFamily="var(--font-dm-sans)"
                      letterSpacing="-0.01em"
                      style={{ transition: 'fill 400ms var(--ease)' }}
                    >
                      {n.label}
                    </text>
                  </g>
                )
              })}
            </svg>

            <figcaption className="flex min-h-[72px] items-center gap-4 border-t px-6 py-4">
              {current ? (
                <>
                  <span className="readout shrink-0">{current.kind}</span>
                  <span className="text-[15px] leading-snug text-foreground">
                    {current.detail}
                  </span>
                </>
              ) : (
                <span className="text-[15px] text-muted-foreground">
                  Point at anything here to see what it holds.
                </span>
              )}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
