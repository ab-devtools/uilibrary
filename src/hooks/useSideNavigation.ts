import { useState, useCallback } from 'react'
import type { SideNavigationControls } from '../components/SideNavigation/types'

export const useSideNavigationControls = (): SideNavigationControls => {
  const [isPined, setPined] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const setOpen = useCallback((open: boolean) => {
    setIsOpen(open)
  }, [])

  const onMouseEnter = useCallback(() => {
    if (!isPined) {
      setOpen(true)
    }
  }, [isPined, setOpen])

  const onMouseLeave = useCallback(() => {
    if (!isPined) {
      setOpen(false)
    }
  }, [isPined, setOpen])

  const onPin = useCallback(() => {
    setPined((prev) => {
      const newState = !prev
      if (!newState) setOpen(false)
      return newState
    })
  }, [setOpen])

  const onClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  return {
    isPined,
    isOpen,
    setOpen,
    onMouseEnter,
    onMouseLeave,
    onPin,
    onClose
  }
}
