import { cn } from '@/lib/utils'

/** The mark is the port: a USB-C outline with the connector seated inside. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        width="26"
        height="14"
        viewBox="0 0 26 14"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          x="0.6"
          y="0.6"
          width="24.8"
          height="12.8"
          rx="6.4"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect x="5" y="5" width="16" height="4" rx="2" fill="currentColor" />
      </svg>
      <span className="text-[1.15rem] font-medium leading-none tracking-[-0.045em]">
        usb-me
      </span>
    </span>
  )
}
