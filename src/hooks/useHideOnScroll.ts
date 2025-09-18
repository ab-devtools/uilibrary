import { useEffect } from 'react'
import { CUSTOM_SCROLL_NAME, CUSTOM_SCROLL_MESSAGE } from '../consts'

export const useHideOnScroll = (
  hide: () => void,
  containerRef?: RefObject<HTMLElement | Window | null>
): null => {
  useEffect(() => {
    const scrollTarget = containerRef?.current || document

    scrollTarget.addEventListener('scroll', hide)
    const handleCustomScroll = (event: Event) => {
      const customEvent = event as CustomEvent<string>
      if (customEvent.detail === CUSTOM_SCROLL_MESSAGE) {
        hide()
      }
    }
    document.addEventListener(CUSTOM_SCROLL_NAME, handleCustomScroll)
    return () => {
      scrollTarget.removeEventListener('scroll', hide)
      document.removeEventListener(CUSTOM_SCROLL_NAME, handleCustomScroll)
    }
  }, [])

  return null
}
