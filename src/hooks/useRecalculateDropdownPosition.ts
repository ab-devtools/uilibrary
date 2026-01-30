import { type RefObject, useEffect } from 'react'

interface Props {
  anchorRef: RefObject<HTMLInputElement | HTMLDivElement | null>
  floatingRef: HTMLDivElement | null
  shouldRecalculatePosition: boolean
  isOpen: boolean
}

export const useRecalculateDropdownPosition = ({
  isOpen,
  anchorRef,
  floatingRef,
  shouldRecalculatePosition
}: Props) => {
  useEffect(() => {
    if (!isOpen || !shouldRecalculatePosition) return
    const update = () => {
      if (!anchorRef.current || !floatingRef) return
      const rect = anchorRef.current.getBoundingClientRect()
      floatingRef.style.left = `${rect.left}px`
      floatingRef.style.width = `${rect.width}px`
      floatingRef.style.top = `${rect.bottom}px`
    }
    update()
    let rafId: number
    const loop = () => {
      update()
      rafId = requestAnimationFrame(loop)
    }
    loop()
    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [isOpen, anchorRef.current, floatingRef])
}
