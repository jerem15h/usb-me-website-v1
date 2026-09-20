import { MaskText } from '@/components/mask-text'
import { Reveal } from '@/components/reveal'
import { SectionLabel } from '@/components/section-label'

export function Thesis() {
  return (
    <section className="rail rail-edges border-t py-24 md:py-32">
      <div className="px-5 sm:px-10">
        <Reveal>
          <SectionLabel>Why we are building this</SectionLabel>
        </Reveal>
        <MaskText
          className="display-sm mt-7 max-w-[20ch] text-[clamp(2rem,4.6vw,3.4rem)]"
          delay={80}
        >
          The intelligence that knows you best should be the one you own.
        </MaskText>

        <Reveal delay={90} className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
          <p className="max-w-[52ch] text-[18px] leading-[1.65] text-muted-foreground">
            Every assistant you use today keeps your memory and your thinking on
            hardware you do not control. You explain yourself again every
            morning. Everything you say leaves the room. You are renting an
            understanding of your own life.
          </p>
          <p className="max-w-[52ch] text-[18px] leading-[1.65] text-foreground">
            Models are now small enough to run on the phone in your pocket, so
            the trade stops making sense. Keep the thinking on the phone. Keep
            the memory on the phone. Let the internet be a tool it picks up, not
            the place it lives.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
