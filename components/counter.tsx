'use client'

import { useEffect, useState } from 'react'
import { useInView } from '@/lib/use-in-view'
import { useReducedMotion } from '@/lib/use-reduced-motion'

/** Counts up once, when it arrives. */
export function Counter({
  to,
  suffix = '',
  duration = 1400,
  className,
}: {
  to: number
  suffix?: string
  duration?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLParagraphElement>('0px 0px -20% 0px')
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setValue(to)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * to))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, to, duration])

  return (
    <p ref={ref} className={className}>
      {value}
      {suffix}
    </p>
  )
}
