import { useState, useEffect, useRef, useCallback } from 'react'

const SCROLL_THRESHOLD = 5
const SCROLL_PERCENTAGE = 0.7
const INITIAL_CHECK_DELAY = 100

interface UseTabScrollReturn {
  containerRef: React.RefObject<HTMLDivElement | null>
  showLeftArrow: boolean
  showRightArrow: boolean
  scrollLeft: () => void
  scrollRight: () => void
}

export const useTabScroll = (): UseTabScrollReturn => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  const checkScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container

    setShowLeftArrow(scrollLeft > SCROLL_THRESHOLD)
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - SCROLL_THRESHOLD)
  }, [])

  const scrollLeft = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const scrollAmount = container.clientWidth * SCROLL_PERCENTAGE
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    })
  }, [])

  const scrollRight = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const scrollAmount = container.clientWidth * SCROLL_PERCENTAGE
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const initialCheck = setTimeout(checkScroll, INITIAL_CHECK_DELAY)

    container.addEventListener('scroll', checkScroll)

    const resizeObserver = new ResizeObserver(checkScroll)
    resizeObserver.observe(container)

    const mutationObserver = new MutationObserver(checkScroll)
    mutationObserver.observe(container, { childList: true, subtree: true })

    return () => {
      clearTimeout(initialCheck)
      container.removeEventListener('scroll', checkScroll)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [checkScroll])

  return {
    containerRef,
    showLeftArrow,
    showRightArrow,
    scrollLeft,
    scrollRight
  }
}
