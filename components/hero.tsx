import { Trace } from '@/components/trace'
import { Reveal } from '@/components/reveal'

const headline = ['Own', 'your', 'intelligence.']

export function Hero() {
  return (
    <section id="top" className="rail rail-edges pb-24 pt-24 sm:pt-32 md:pb-32 md:pt-40">
      <div className="px-5 sm:px-10">
        <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">
          <p
            className="surface inline-flex items-center gap-2.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] text-muted-foreground sm:text-[13px]"
            style={{ animation: 'settle 900ms var(--ease-out) forwards', opacity: 0 }}
          >
            <span className="relative flex h-1.5 w-1.5 items-center justify-center">
              <span
                aria-hidden="true"
                className="pulse-ring absolute h-1.5 w-1.5 rounded-full"
                style={{ background: 'var(--foreground)' }}
              />
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: 'var(--foreground)' }}
              />
            </span>
            <span className="sm:hidden">
              On your iPhone. Powered by Nemotron.
            </span>
            <span className="hidden sm:inline">
              On your iPhone. Powered by NVIDIA Nemotron.
            </span>
          </p>

          <h1 className="display mt-9 text-[clamp(2.5rem,6vw,4.5rem)]">
            {headline.map((word, i) => (
              <span
                key={word}
                className="word"
                style={{ animationDelay: `${140 + i * 110}ms` }}
              >
                {word}
                {i < headline.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>

          <Reveal delay={380}>
            <p className="mx-auto mt-7 max-w-[54ch] text-[19px] leading-[1.5] text-muted-foreground">
              It learns what you choose to share, works out what you are trying
              to get done, and does it. On your phone, not on a server.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#access"
                className="btn btn-solid px-6 py-3 text-[15px] font-medium"
              >
                Get early access
              </a>
              <a href="#how" className="btn btn-soft px-6 py-3 text-[15px]">
                See how it works
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={520} className="mx-auto mt-20 max-w-[980px] md:mt-24">
          <Trace />
        </Reveal>
      </div>
    </section>
  )
}
