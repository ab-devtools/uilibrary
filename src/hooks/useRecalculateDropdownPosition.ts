import { type RefObject, useEffect } from 'react'

interface Props {
  inputRef: RefObject<HTMLInputElement | null>
  dropdownRef: HTMLDivElement | null
  shouldRecalculateDropdownPosition: boolean
  isOpen: boolean
}

export const useRecalculateDropdownPosition = ({
  isOpen,
  inputRef,
  dropdownRef,
  shouldRecalculateDropdownPosition
}: Props) => {
  useEffect(() => {
    if (!isOpen || !shouldRecalculateDropdownPosition) return
    const update = () => {
      if (!inputRef.current || !dropdownRef) return
      const rect = inputRef.current.getBoundingClientRect()
      dropdownRef.style.left = `${rect.left}px`
      dropdownRef.style.width = `${rect.width}px`
      dropdownRef.style.top = `${rect.bottom}px`
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
  }, [isOpen, inputRef.current, dropdownRef])
}
