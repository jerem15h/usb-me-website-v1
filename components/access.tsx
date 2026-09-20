'use client'

import { useState } from 'react'
import { ParallaxImage } from '@/components/parallax-image'
import { MaskText } from '@/components/mask-text'
import { Reveal } from '@/components/reveal'

const asks = [
  'Where did we leave off?',
  'What did I promise people this week?',
  'I have two hours. What should I work on?',
  'What are we still missing before launch?',
]

export function Access() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <section id="access" className="border-t">
      <div className="rail rail-edges py-24 md:py-32">
        <div className="grid gap-14 px-5 sm:px-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <MaskText className="display max-w-[13ch] text-[clamp(2.4rem,5.6vw,4.2rem)]">
              Six months in, it already knows.
            </MaskText>
            <Reveal delay={180}>
            <p className="mt-7 max-w-[44ch] text-[18px] leading-[1.65] text-muted-foreground">
              You pick up your phone and there is no catching up to do. Less
              like opening an app. More like carrying on. We are letting the
              first people in soon.
            </p>

            <form
              className="mt-9"
              onSubmit={(e) => {
                e.preventDefault()
                if (email.trim()) setSent(true)
              }}
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="surface min-w-0 flex-1 rounded-[10px] px-4 py-3 text-[15px] text-foreground transition-colors duration-500 placeholder:text-dim focus:border-[color:var(--line-hi)]"
                />
                <button type="submit" className="btn btn-solid px-5 py-3 text-[15px] font-medium">
                  Request access
                </button>
              </div>
              <p
                className="mt-3 text-[14px] transition-colors duration-500"
                style={{ color: sent ? 'var(--signal)' : 'var(--muted-foreground)' }}
                role={sent ? 'status' : undefined}
              >
                {sent
                  ? 'You are on the list. We will write when there is a build worth your time.'
                  : 'One email when the beta opens. Nothing else.'}
              </p>
            </form>
            </Reveal>
          </div>

          <Reveal delay={110} className="md:col-span-5 md:col-start-8">
            <p className="readout">what people ask it</p>
            <ul className="mt-5">
              {asks.map((a) => (
                <li
                  key={a}
                  className="border-t py-4 text-[19px] leading-snug tracking-[-0.025em] text-foreground last:border-b"
                >
                  “{a}”
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <ParallaxImage
        src="/images/hero.png"
        alt="A person in low light holding a phone, its screen lighting their face"
        sizes="100vw"
        strength={70}
        className="aspect-[16/6] w-full border-t"
      />
    </section>
  )
}
