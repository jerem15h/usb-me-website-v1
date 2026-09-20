'use client'

import { useInView } from '@/lib/use-in-view'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'

/**
 * Words rise from behind their own baseline. Used on headings only, so the
 * gesture stays rare enough to mean something.
 */
export function MaskText({
  children,
  className,
  as: Tag = 'h2',
  delay = 0,
  stagger = 42,
}: {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  delay?: number
  stagger?: number
}) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLHeadingElement>()
  const words = children.split(' ')
  const shown = reduced || inView

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-flex overflow-hidden align-bottom"
          style={{ paddingBottom: '0.06em' }}
        >
          <span
            className="inline-block"
            style={{
              transform: shown ? 'none' : 'translateY(108%)',
              transition: reduced
                ? 'none'
                : `transform 1000ms var(--ease-out) ${delay + i * stagger}ms`,
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}

/** Same gesture, sized for a single short line such as a section marker. */
export function MaskLine({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLSpanElement>()
  const shown = reduced || inView

  return (
    <span ref={ref} className={cn('inline-flex overflow-hidden', className)}>
      <span
        className="inline-flex"
        style={{
          transform: shown ? 'none' : 'translateY(110%)',
          transition: reduced
            ? 'none'
            : `transform 900ms var(--ease-out) ${delay}ms`,
        }}
      >
        {children}
      </span>
    </span>
  )
}
