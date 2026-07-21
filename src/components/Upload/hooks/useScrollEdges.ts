import type { RefObject } from 'react'
import { useCallback, useEffect, useState } from 'react'

interface TScrollEdges {
  canScrollLeft: boolean
  canScrollRight: boolean
  recompute: () => void
}

const EDGE_THRESHOLD = 1

export const useScrollEdges = <T extends HTMLElement>(
  ref: RefObject<T>,
  dependency: unknown
): TScrollEdges => {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const recompute = useCallback(() => {
    const el = ref.current
    if (!el) {
      setCanScrollLeft(false)
      setCanScrollRight(false)
      return
    }

    const { scrollLeft, scrollWidth, clientWidth } = el

    setCanScrollLeft(scrollLeft > EDGE_THRESHOLD)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - EDGE_THRESHOLD)
  }, [ref])

  useEffect(() => {
    recompute()

    const el = ref.current
    if (!el || typeof ResizeObserver === 'undefined') return

    const resizeObserver = new ResizeObserver(recompute)
    resizeObserver.observe(el)

    window.addEventListener('resize', recompute)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', recompute)
    }
  }, [ref, recompute, dependency])

  return { canScrollLeft, canScrollRight, recompute }
}
