'use client'

import { useState } from 'react'
import { MaskText } from '@/components/mask-text'
import { Reveal } from '@/components/reveal'
import { SectionLabel } from '@/components/section-label'

const modes = [
  {
    name: 'Local only',
    body: 'It cannot touch the network at all. Every answer comes from what is already on your phone.',
    tools: false,
  },
  {
    name: 'Ask first',
    body: 'It works on your phone until a task really needs the outside world. Then it stops and asks you.',
    tools: true,
  },
  {
    name: 'Connected',
    body: 'It uses the services you connected, inside the permissions you gave each one.',
    tools: true,
  },
]

const tools = [
  'Calendar', 'Reminders', 'Contacts', 'Files',
  'Mail', 'Drive', 'GitHub', 'Slack', 'Web search',
]

export function Control() {
  const [mode, setMode] = useState(1)
  const active = modes[mode]

  return (
    <section id="control" className="ink-block">
      <div className="rail rail-edges grid gap-14 px-5 py-24 sm:px-10 md:grid-cols-12 md:gap-12 md:py-32">
        <div className="md:col-span-5">
        <Reveal>
          <SectionLabel>Control</SectionLabel>
        </Reveal>
        <MaskText
          className="display-sm mt-7 max-w-[16ch] text-[clamp(2rem,4.6vw,3.4rem)]"
          delay={80}
        >
          You decide how far it can reach.
        </MaskText>
        <Reveal delay={200}>
          <p className="max-w-[46ch] text-[18px] leading-[1.65] text-muted-foreground">
            We will not claim nothing ever leaves your phone. Sending an email
            means sending an email. What we promise is that only the part a task
            needs goes out. Your memory never travels just because one tool
            wanted the internet.
          </p>
          <p className="mt-5 max-w-[46ch] text-[18px] leading-[1.65] text-foreground">
            Before it does anything that touches another person, it asks.
          </p>
        </Reveal>
        </div>

        <Reveal delay={120} className="md:col-span-7">
          <div className="surface overflow-hidden rounded-xl">
            <div role="radiogroup" aria-label="Network mode" className="relative grid grid-cols-3 border-b">
              <span
                aria-hidden="true"
                className="absolute bottom-0 h-px transition-all duration-500"
                style={{
                  width: `${100 / modes.length}%`,
                  left: `${(mode * 100) / modes.length}%`,
                  background: 'var(--signal)',
                  transitionTimingFunction: 'var(--ease-out)',
                }}
              />
              {modes.map((m, i) => (
                <button
                  key={m.name}
                  type="button"
                  role="radio"
                  aria-checked={mode === i}
                  onClick={() => setMode(i)}
                  className="px-3 py-4 text-[14px] transition-all duration-500 sm:text-[15px]"
                  style={{
                    color: mode === i ? 'var(--foreground)' : 'var(--dim)',
                    borderLeft: i > 0 ? '1px solid var(--line)' : undefined,
                    background: mode === i ? 'var(--panel-hi)' : 'transparent',
                  }}
                >
                  {m.name}
                </button>
              ))}
            </div>

            <div className="p-6 sm:p-8">
              <p
                key={mode}
                className="min-h-[5.5rem] max-w-[50ch] text-[17px] leading-[1.65] text-foreground"
                style={{ animation: 'settle 600ms var(--ease-out) forwards', opacity: 0 }}
              >
                {active.body}
              </p>

              <div className="mt-7 border-t pt-6">
                <p className="readout">connected tools</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tools.map((t, i) => (
                    <span
                      key={t}
                      className="rounded-md border px-2.5 py-1 text-[14px]"
                      style={{
                        borderColor: active.tools ? 'var(--line-hi)' : 'var(--line)',
                        color: active.tools ? 'var(--foreground)' : 'var(--dim)',
                        opacity: active.tools ? 1 : 0.45,
                        transform: active.tools ? 'none' : 'scale(0.97)',
                        transition: `all 500ms var(--ease-out) ${i * 22}ms`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p
                  className="mt-4 text-[14px] text-muted-foreground transition-opacity duration-500"
                  style={{ opacity: active.tools ? 0 : 1 }}
                  aria-hidden={active.tools}
                >
                  All out of reach while local only is on.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
