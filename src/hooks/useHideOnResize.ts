
import { useEffect } from 'react'
import { CUSTOM_RESIZE_NAME, CUSTOM_RESIZE_MESSAGE } from '../consts'

export const useHideOnResize = (hide: () => void): null => {
  useEffect(() => {
    window.addEventListener('resize', hide)
    return () => {
      window.removeEventListener('resize', hide)
    }
  }, [])

  useEffect(() => {
    window.addEventListener(CUSTOM_RESIZE_NAME, (event: Event) => {
      const customEvent = event as CustomEvent<string>
      // Check the event type
      if (customEvent.detail === CUSTOM_RESIZE_MESSAGE) {
        // Close the menu
        hide()
      }
    })
  }, [])

  return null
}
