'use client'

import { useInView } from '@/lib/use-in-view'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'

export function ProgressBar({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>('0px 0px -20% 0px')
  const filled = reduced || inView

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={Math.round(value * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-px w-full overflow-hidden', className)}
      style={{ background: 'var(--line)' }}
    >
      <div
        className="h-full origin-left"
        style={{
          background: 'var(--foreground)',
          transform: `scaleX(${filled ? value : 0})`,
          transition: reduced
            ? 'none'
            : 'transform 1500ms var(--ease-out) 120ms',
        }}
      />
    </div>
  )
}
