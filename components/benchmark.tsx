'use client'

import { Counter } from '@/components/counter'
import { MaskText } from '@/components/mask-text'
import { Reveal } from '@/components/reveal'
import { SectionLabel } from '@/components/section-label'
import { useInView } from '@/lib/use-in-view'
import { useReducedMotion } from '@/lib/use-reduced-motion'

const scores = [
  { model: 'Qwen3 14B', passed: 83, rate: 55.3 },
  { model: 'Nemotron 3 Nano 4B', passed: 56, rate: 37.3, ours: true },
  { model: 'Phi-4 Mini', passed: 51, rate: 34.0 },
]

const sizes = [
  { model: 'Qwen3 14B', gb: 9, label: 'about 9 GB' },
  { model: 'Nemotron 3 Nano 4B', gb: 2.84, label: '2.84 GB', ours: true },
]

const categories = [
  'Tool selection',
  'Arguments',
  'Permissions',
  'Confirmation',
  'Untrusted content',
  'Calendar actions',
  'File tasks',
  'Time reasoning',
]

function Bar({
  value,
  max,
  shown,
  delay,
  strong,
}: {
  value: number
  max: number
  shown: boolean
  delay: number
  strong?: boolean
}) {
  const reduced = useReducedMotion()
  return (
    <div
      className="h-[10px] w-full overflow-hidden rounded-full"
      style={{ background: 'var(--panel-hi)' }}
    >
      <div
        className="h-full origin-left rounded-full"
        style={{
          background: strong ? 'var(--foreground)' : 'var(--line-hi)',
          transform: `scaleX(${shown ? value / max : 0})`,
          transition: reduced
            ? 'none'
            : `transform 1400ms var(--ease-out) ${delay}ms`,
        }}
      />
    </div>
  )
}

export function Benchmark() {
  const { ref, inView } = useInView<HTMLDivElement>('0px 0px -20% 0px')
  const reduced = useReducedMotion()
  const shown = reduced || inView

  return (
    <section id="evidence" className="rail rail-edges border-t py-24 md:py-32">
      <div className="px-5 sm:px-10">
        <Reveal>
          <SectionLabel>Evidence</SectionLabel>
        </Reveal>
        <MaskText
          className="display-sm mt-7 max-w-[19ch] text-[clamp(2rem,4.6vw,3.4rem)]"
          delay={80}
        >
          We measured it, including where it loses.
        </MaskText>
        <Reveal delay={200}>
          <p className="mt-6 max-w-[58ch] text-[18px] leading-[1.65] text-muted-foreground">
            We built a suite of 150 scenarios and ran the same tests against
            three models. Every scenario asks for a structured decision. Pick
            the right tool, fill in the arguments, respect a permission, ask
            before acting, refuse untrusted content, or handle a question about
            a calendar, a file, or time.
          </p>
        </Reveal>

        {/* The shape of the run */}
        <Reveal delay={260} className="mt-14 grid border-t sm:grid-cols-3">
          {[
            { n: 150, label: 'scenarios' },
            { n: 3, label: 'models tested' },
            { n: 450, label: 'responses scored' },
          ].map((s, i) => (
            <div
              key={s.label}
              className="border-b py-7 sm:border-b-0 sm:py-9"
              style={{
                borderLeft: i > 0 ? '1px solid var(--line)' : undefined,
                paddingLeft: i > 0 ? '2rem' : undefined,
              }}
            >
              <Counter
                to={s.n}
                className="text-[40px] leading-none tracking-[-0.05em]"
              />
              <p className="mt-2.5 text-[15px] text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </Reveal>

        <div ref={ref} className="mt-16 grid gap-14 border-t pt-12 md:grid-cols-12 md:gap-12">
          {/* Scores */}
          <div className="md:col-span-7">
            <p className="readout">passed, out of 150</p>
            <ul className="mt-7 space-y-7">
              {scores.map((s, i) => (
                <li key={s.model}>
                  <div className="mb-3 flex items-baseline justify-between gap-4">
                    <span
                      className="text-[16px] tracking-[-0.02em]"
                      style={{
                        color: s.ours
                          ? 'var(--foreground)'
                          : 'var(--muted-foreground)',
                      }}
                    >
                      {s.model}
                      {s.ours && (
                        <span className="readout ml-3">what we ship</span>
                      )}
                    </span>
                    <span
                      className="shrink-0 text-[16px] tabular-nums"
                      style={{
                        color: s.ours
                          ? 'var(--foreground)'
                          : 'var(--muted-foreground)',
                      }}
                    >
                      {s.passed} of 150, {s.rate.toFixed(1)}%
                    </span>
                  </div>
                  <Bar
                    value={s.rate}
                    max={100}
                    shown={shown}
                    delay={i * 140}
                    strong={s.ours}
                  />
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[54ch] text-[15px] leading-relaxed text-muted-foreground">
              Bars run to 100, not to the leader, because none of these models
              is close to finished on work this strict.
            </p>
          </div>

          {/* The tradeoff that decides it */}
          <div className="md:col-span-5">
            <p className="readout">size on disk</p>
            <ul className="mt-7 space-y-7">
              {sizes.map((s, i) => (
                <li key={s.model}>
                  <div className="mb-3 flex items-baseline justify-between gap-4">
                    <span
                      className="text-[16px] tracking-[-0.02em]"
                      style={{
                        color: s.ours
                          ? 'var(--foreground)'
                          : 'var(--muted-foreground)',
                      }}
                    >
                      {s.model}
                    </span>
                    <span
                      className="shrink-0 text-[16px] tabular-nums"
                      style={{
                        color: s.ours
                          ? 'var(--foreground)'
                          : 'var(--muted-foreground)',
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                  <Bar
                    value={s.gb}
                    max={9}
                    shown={shown}
                    delay={420 + i * 140}
                    strong={s.ours}
                  />
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t pt-7">
              <p className="text-[clamp(1.6rem,3vw,2.1rem)] leading-none tracking-[-0.04em]">
                3.17× larger
              </p>
              <p className="mt-4 max-w-[38ch] text-[16px] leading-[1.6] text-foreground">
                Qwen scored highest. It is also more than three times the size,
                and past what we can put on a phone today. The question we care
                about is which model wins inside the budget a pocket gives you.
              </p>
            </div>
          </div>
        </div>

        {/* Honest split */}
        <Reveal className="mt-16 grid gap-10 border-t pt-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="readout">where it held up</p>
            <p className="mt-5 max-w-[46ch] text-[18px] leading-[1.6] text-foreground">
              It cleared all eight execution status cases, and it handled
              permissions better than either of the other two models. Those are
              the cases where a mistake would act on your behalf without asking,
              so they are the ones we care about most.
            </p>
          </div>
          <div>
            <p className="readout">where it did not</p>
            <p className="mt-5 max-w-[46ch] text-[18px] leading-[1.6] text-muted-foreground">
              Calendar actions, file tasks and time reasoning are where it fell
              down. Those failures are specific and reproducible, which is the
              useful kind, and they are what we are working on now.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 border-t pt-8">
          <p className="readout">what every scenario tests</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((c) => (
              <span
                key={c}
                className="rounded-md border px-2.5 py-1 text-[14px] text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
          <p className="mt-8 max-w-[62ch] text-[15px] leading-relaxed text-muted-foreground">
            These are our own numbers, from our own suite, scored
            automatically in September 2026. They are early. We will keep
            publishing them as they move, including the runs that go badly.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
