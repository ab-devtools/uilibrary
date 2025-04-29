import { useState, useCallback } from 'react'
import type { SideNavigationControls } from '../components/SideNavigation/types'

export const useSideNavigationControls = (): SideNavigationControls => {
  const [isPined, setPined] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = useCallback((open: boolean) => {
    setIsOpen(open)
  }, [])

  const onMouseEnter = useCallback(() => {
    if (!isPined) {
      onOpen(true)
    }
  }, [isPined, onOpen])

  const onMouseLeave = useCallback(() => {
    if (!isPined) {
      onOpen(false)
    }
  }, [isPined, onOpen])

  const onPin = useCallback(() => {
    setPined((prev) => {
      const newState = !prev

      if (!newState) {
        onOpen(false)
        if (isOpen) setTimeout(onClose, 0)
      }

      return newState
    })
  }, [onOpen, isOpen])

  const onClose = useCallback(() => {
    onOpen(false)
  }, [onOpen])

  return {
    isPined,
    isOpen,
    onOpen,
    onMouseEnter,
    onMouseLeave,
    onPin,
    onClose
  }
}
