'use client'

import { useEffect, useRef, useState } from 'react'

/** Fires once, when the element first crosses into view. */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  rootMargin = '0px 0px -15% 0px',
) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [rootMargin])

  return { ref, inView }
}
