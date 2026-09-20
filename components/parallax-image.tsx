'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'

/** The frame holds still; the picture inside drifts against it. */
export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  strength = 40,
  priority,
}: {
  src: string
  alt: string
  sizes: string
  className?: string
  strength?: number
  priority?: boolean
}) {
  const reduced = useReducedMotion()
  const frame = useRef<HTMLDivElement | null>(null)
  const inner = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (reduced) return
    let raf = 0
    const update = () => {
      raf = 0
      const f = frame.current
      const el = inner.current
      if (!f || !el) return
      const rect = f.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      const centre = rect.top + rect.height / 2
      const offset = (centre - window.innerHeight / 2) / window.innerHeight
      el.style.transform = `translate3d(0, ${(-offset * strength).toFixed(2)}px, 0)`
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
  }, [reduced, strength])

  return (
    <div ref={frame} className={cn('relative overflow-hidden', className)}>
      <div
        ref={inner}
        className="absolute will-change-transform"
        style={{ inset: `-${strength}px 0` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ filter: 'grayscale(1) contrast(1.06)' }}
        />
      </div>
    </div>
  )
}
