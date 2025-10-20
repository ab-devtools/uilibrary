import { useEffect } from 'react'

export const useHideOnResize = (hide: () => void) => {
  useEffect(() => {
    window.addEventListener('resize', hide)
    return () => {
      window.removeEventListener('resize', hide)
    }
  }, [hide])
}
