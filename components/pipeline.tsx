'use client'

import { useEffect, useState } from 'react'
import { MaskText } from '@/components/mask-text'
import { Reveal } from '@/components/reveal'
import { SectionLabel } from '@/components/section-label'
import { useReducedMotion } from '@/lib/use-reduced-motion'

const stages = [
  {
    short: 'You speak',
    title: 'You speak',
    body: 'You hold the button and say what you want, the way you would say it to a person.',
    example: 'I need to meet Sarah before our demo.',
    outside: false,
  },
  {
    short: 'It hears',
    title: 'It hears you',
    body: 'Your voice becomes words on the phone. The recording never goes anywhere.',
    example: 'Audio stays on the device. Nothing is uploaded.',
    outside: false,
  },
  {
    short: 'It remembers',
    title: 'It remembers',
    body: 'It pulls up the people, projects and promises your words point at.',
    example: 'Sarah Okonkwo. Nemotron benchmark. Demo on Thursday.',
    outside: false,
  },
  {
    short: 'It thinks',
    title: 'It thinks',
    body: 'Nemotron works out what you actually want and plans the steps to get there.',
    example: 'Find a slot before Thursday. Then write a brief.',
    outside: false,
  },
  {
    short: 'It acts',
    title: 'It acts',
    body: 'It runs the steps. Most happen on your phone. If one needs the outside world, it stops and asks you.',
    example: 'Read calendar. Read project. Draft brief. Ask before messaging Sarah.',
    outside: true,
  },
  {
    short: 'It answers',
    title: 'It answers',
    body: 'It speaks back, and writes down what changed so it knows next time.',
    example: 'You are both free Wednesday at 4:30. Your brief is ready.',
    outside: false,
  },
]

const STEP_MS = 2800

export function Pipeline() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!playing || reduced) return
    const t = setTimeout(
      () => setActive((i) => (i + 1) % stages.length),
      STEP_MS,
    )
    return () => clearTimeout(t)
  }, [playing, active, reduced])

  const pick = (i: number) => {
    setActive(i)
    setPlaying(false)
    setStarted(true)
  }

  const current = stages[active]
  const progress = (active / (stages.length - 1)) * 100
  const reaching = current.outside

  return (
    <section id="how" className="ink-block">
      <div className="rail rail-edges px-5 py-24 sm:px-10 md:py-32">
        <Reveal>
          <SectionLabel>How it works</SectionLabel>
          <div className="mt-7 flex flex-col gap-7 md:flex-row md:items-end md:justify-between md:gap-10">
            <div>
              <MaskText
                className="display-sm max-w-[16ch] text-[clamp(2rem,4.6vw,3.4rem)]"
                delay={60}
              >
                Follow one sentence all the way through.
              </MaskText>
              <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.6] text-muted-foreground">
                Six steps happen between you speaking and your phone answering.
                Play it, or step through them yourself.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setPlaying((p) => !p)
                if (!started) {
                  setActive(0)
                  setStarted(true)
                }
              }}
              className="btn btn-soft inline-flex shrink-0 items-center gap-3 px-5 py-3 text-[15px]"
              aria-label={playing ? 'Pause the walkthrough' : 'Play the walkthrough'}
            >
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                {playing && (
                  <span
                    aria-hidden="true"
                    className="pulse-ring absolute h-2.5 w-2.5 rounded-full"
                    style={{ background: 'var(--signal)' }}
                  />
                )}
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full transition-colors duration-500"
                  style={{
                    background: playing ? 'var(--signal)' : 'var(--dim)',
                  }}
                />
              </span>
              {playing ? 'Pause' : 'Play it'}
            </button>
          </div>
        </Reveal>

        <Reveal delay={110} className="mt-14">
          {/* Outside the phone */}
          <div
            className="flex items-center justify-between gap-4 rounded-t-xl border border-b-0 px-6 py-4 transition-colors duration-700"
            style={{
              borderColor: reaching ? 'var(--signal-dim)' : 'var(--line)',
              background: reaching ? 'var(--signal-dim)' : 'transparent',
            }}
          >
            <span className="readout whitespace-nowrap">the internet</span>
            <span
              className="text-[14px] transition-colors duration-700"
              style={{
                color: reaching ? 'var(--foreground)' : 'var(--dim)',
              }}
            >
              {reaching
                ? 'Reaching out for one step, and only if you allow it'
                : 'Not in use'}
            </span>
          </div>

          {/* The boundary */}
          <div
            aria-hidden="true"
            className="relative h-10 border-x px-6 sm:px-8"
            style={{ borderColor: 'var(--line)' }}
          >
            <span
              className="absolute inset-x-0 top-1/2 h-px"
              style={{
                background: 'var(--line)',
                maskImage:
                  'repeating-linear-gradient(to right, #000 0 6px, transparent 6px 12px)',
                WebkitMaskImage:
                  'repeating-linear-gradient(to right, #000 0 6px, transparent 6px 12px)',
              }}
            />
            {/* The one place anything crosses, lined up with the stage below */}
            <span className="relative hidden h-full sm:block">
              <span
                className="absolute top-0 bottom-0 w-px transition-opacity duration-700"
                style={{
                  left: `${((4 + 0.5) / stages.length) * 100}%`,
                  background: 'var(--signal)',
                  opacity: reaching ? 1 : 0,
                }}
              />
            </span>
          </div>

          {/* On your phone */}
          <div className="surface rounded-b-xl rounded-t-xl p-6 sm:p-8">
            <p className="readout">your phone</p>

            {/* Rail */}
            <div className="relative mt-7 hidden sm:block">
              <div
                aria-hidden="true"
                className="absolute left-0 right-0 top-[7px] h-px"
                style={{ background: 'var(--line)' }}
              />
              <div
                aria-hidden="true"
                className="absolute left-0 top-[7px] h-px transition-all duration-700"
                style={{
                  width: `${progress}%`,
                  background: 'var(--signal)',
                }}
              />
              <ol className="relative grid grid-cols-6">
                {stages.map((s, i) => {
                  const done = i <= active
                  const isActive = i === active
                  return (
                    <li key={s.short} className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => pick(i)}
                        aria-current={isActive ? 'step' : undefined}
                        className="group flex flex-col items-center gap-3"
                      >
                        <span className="relative flex h-[15px] w-[15px] items-center justify-center">
                          {isActive && (
                            <span
                              aria-hidden="true"
                              className="pulse-ring absolute h-[15px] w-[15px] rounded-full"
                              style={{ background: 'var(--signal)' }}
                            />
                          )}
                          <span
                            className="rounded-full transition-all duration-500"
                            style={{
                              height: isActive ? 15 : 9,
                              width: isActive ? 15 : 9,
                              background: done
                                ? 'var(--signal)'
                                : 'var(--background)',
                              border: done
                                ? 'none'
                                : '1px solid var(--line-hi)',
                            }}
                          />
                        </span>
                        <span
                          className="text-[13.5px] transition-colors duration-500"
                          style={{
                            color: isActive
                              ? 'var(--foreground)'
                              : 'var(--dim)',
                          }}
                        >
                          {s.short}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>

            {/* Mobile rail */}
            <ol className="mt-6 sm:hidden">
              {stages.map((s, i) => {
                const isActive = i === active
                return (
                  <li key={s.short}>
                    <button
                      type="button"
                      onClick={() => pick(i)}
                      aria-current={isActive ? 'step' : undefined}
                      className="flex w-full items-center gap-3 py-2.5 text-left"
                    >
                      <span
                        className="h-2 w-2 shrink-0 rounded-full transition-all duration-500"
                        style={{
                          background:
                            i <= active ? 'var(--signal)' : 'var(--line-hi)',
                        }}
                      />
                      <span
                        className="text-[15px] transition-colors duration-500"
                        style={{
                          color: isActive
                            ? 'var(--foreground)'
                            : 'var(--dim)',
                        }}
                      >
                        {s.short}
                      </span>
                      {s.outside && (
                        <span className="readout ml-auto">asks first</span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ol>

            {/* Detail */}
            <div className="mt-9 border-t pt-7" style={{ borderColor: 'var(--line)' }}>
              <div key={active} style={{ animation: 'settle 600ms var(--ease-out) forwards', opacity: 0 }}>
                <h3 className="text-[22px] tracking-[-0.025em]">
                  {current.title}
                </h3>
                <p className="mt-3 max-w-[58ch] text-[17px] leading-[1.6] text-muted-foreground">
                  {current.body}
                </p>
                <p className="mt-5 max-w-[58ch] font-mono text-[13.5px] leading-[1.6] text-foreground">
                  {current.example}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
