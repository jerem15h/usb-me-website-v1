'use client'

import { useEffect, useRef } from 'react'
import { MaskText } from '@/components/mask-text'
import { Reveal } from '@/components/reveal'
import { SectionLabel } from '@/components/section-label'
import { useReducedMotion } from '@/lib/use-reduced-motion'

const rungs = [
  {
    kind: 'A command',
    said: 'Text Abdou that I am running ten minutes late.',
    does: 'The things you already expect from a phone. Calls, messages, reminders, calendar, contacts, files. It just does them.',
    aside: 'One step. No thinking required.',
  },
  {
    kind: 'A request',
    said: 'Get me ready for my meeting with Sarah.',
    does: 'It works out which Sarah, which project, which meeting. It pulls what is still open between you, searches when it has to, and hands you a brief.',
    aside: 'Several steps. It decides the order.',
  },
  {
    kind: 'A goal',
    said: 'I want this project ready by Friday.',
    does: 'It works out what has to happen, builds a plan, finds what is missing, and tells you what to start with this morning.',
    aside: 'No steps given. It works them out.',
  },
]

const STICK_TOP = 96
const STEP = 26

export function Ladder() {
  const reduced = useReducedMotion()
  const cards = useRef<(HTMLElement | null)[]>([])

  /* As each card is covered by the next, it settles back a little. */
  useEffect(() => {
    if (reduced) return
    let raf = 0

    const update = () => {
      raf = 0
      cards.current.forEach((el, i) => {
        const next = cards.current[i + 1]
        if (!el) return
        if (!next) {
          el.style.transform = 'none'
          return
        }
        const stick = STICK_TOP + i * STEP
        const span = window.innerHeight - stick
        const covered = Math.min(
          1,
          Math.max(0, (window.innerHeight - next.getBoundingClientRect().top) / span),
        )
        el.style.transform = `scale(${(1 - covered * 0.05).toFixed(4)})`
        el.style.opacity = `${(1 - covered * 0.2).toFixed(3)}`
      })
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduced])

  return (
    <section id="work" className="rail rail-edges border-t py-24 md:py-32">
      <div className="px-5 sm:px-10">
        <Reveal>
          <SectionLabel>What it does</SectionLabel>
        </Reveal>
        <MaskText
          className="display-sm mt-7 max-w-[18ch] text-[clamp(2rem,4.6vw,3.4rem)]"
          delay={80}
        >
          Talking is only the surface.
        </MaskText>
        <Reveal delay={200}>
          <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.6] text-muted-foreground">
            You speak to it the way you speak to a person. What matters is how
            much of the thinking it takes off your hands, and that grows with
            how much you hand it.
          </p>
        </Reveal>

        <ol className="mt-16 pb-[12vh]">
          {rungs.map((r, i) => (
            <li
              key={r.kind}
              className="sticky mb-5"
              style={{ top: `${STICK_TOP + i * STEP}px` }}
            >
              <article
                ref={(el) => {
                  cards.current[i] = el
                }}
                className="overflow-hidden rounded-2xl border will-change-transform"
                style={{
                  background: 'var(--background)',
                  transformOrigin: 'top center',
                }}
              >
                <header className="flex items-center justify-between gap-4 border-b px-6 py-4 sm:px-9">
                  <span className="readout">{r.kind}</span>
                  <span className="readout">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </header>

                <div className="grid gap-6 px-6 py-9 sm:px-9 md:grid-cols-12 md:gap-10 md:py-12">
                  <div className="md:col-span-5">
                    <p className="max-w-[24ch] text-[clamp(1.3rem,2.2vw,1.65rem)] leading-[1.25] tracking-[-0.03em]">
                      “{r.said}”
                    </p>
                  </div>
                  <div className="md:col-span-6 md:col-start-7">
                    <p className="max-w-[52ch] text-[17px] leading-[1.65] text-muted-foreground">
                      {r.does}
                    </p>
                    <p className="mt-5 text-[15px] text-foreground">{r.aside}</p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
