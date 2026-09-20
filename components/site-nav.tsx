'use client'

import { useEffect, useState } from 'react'
import { Wordmark } from '@/components/wordmark'

const links = [
  { label: 'What it does', href: '#work' },
  { label: 'How it works', href: '#how' },
  { label: 'Memory', href: '#memory' },
  { label: 'Evidence', href: '#evidence' },
  { label: 'Control', href: '#control' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const [lifted, setLifted] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setLifted(window.scrollY > 8)
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: lifted ? 'color-mix(in srgb, var(--paper) 78%, transparent)' : 'transparent',
        backdropFilter: lifted ? 'blur(18px) saturate(1.4)' : 'none',
        WebkitBackdropFilter: lifted ? 'blur(18px) saturate(1.4)' : 'none',
        borderBottom: `1px solid ${lifted ? 'var(--line)' : 'transparent'}`,
        transition:
          'background 600ms var(--ease), border-color 600ms var(--ease), backdrop-filter 600ms var(--ease)',
      }}
    >
      <nav className="rail">
        <div className="flex h-[72px] items-center justify-between gap-6 px-5 sm:px-10">
          <a href="#top" aria-label="usb-me home" className="shrink-0">
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="underline-grow text-[14px] text-muted-foreground transition-colors duration-400 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#access"
            className="btn btn-solid hidden px-4 py-2 text-[14px] font-medium md:inline-flex"
          >
            Get early access
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="btn btn-ghost inline-flex h-9 w-9 items-center justify-center md:hidden"
          >
            <span className="flex flex-col gap-[5px]">
              <span
                className="block h-px w-4 bg-foreground transition-transform duration-400"
                style={{ transform: open ? 'translateY(3px) rotate(45deg)' : 'none' }}
              />
              <span
                className="block h-px w-4 bg-foreground transition-transform duration-400"
                style={{ transform: open ? 'translateY(-3px) rotate(-45deg)' : 'none' }}
              />
            </span>
          </button>
        </div>
      </nav>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left"
        style={{
          background: 'var(--foreground)',
          transform: `scaleX(${progress})`,
          opacity: lifted ? 0.85 : 0,
          transition: 'opacity 500ms var(--ease)',
        }}
      />

      <div
        className="overflow-hidden border-t md:hidden"
        style={{
          maxHeight: open ? 320 : 0,
          borderColor: open ? 'var(--line)' : 'transparent',
          transition: 'max-height 550ms var(--ease-out), border-color 400ms var(--ease)',
        }}
      >
        <ul className="rail flex flex-col px-5 py-3 sm:px-10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-[15px] text-muted-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="py-3">
            <a
              href="#access"
              onClick={() => setOpen(false)}
              className="btn btn-solid inline-flex px-4 py-2.5 text-[15px] font-medium"
            >
              Get early access
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
