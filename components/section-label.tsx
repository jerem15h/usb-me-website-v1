import { cn } from '@/lib/utils'

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-3 text-[13px] text-muted-foreground', className)}>
      <span
        aria-hidden="true"
        className="h-px w-8"
        style={{ background: 'var(--signal)' }}
      />
      {children}
    </span>
  )
}
