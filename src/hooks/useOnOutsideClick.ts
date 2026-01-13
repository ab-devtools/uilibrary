import { useEffect } from 'react'

type TRefs = HTMLElement | (HTMLElement | null)[] | null

type TProps = {
  ref: TRefs
  callback: (event: MouseEvent) => void
  uid: string
  shouldRemoveCallback: boolean
}

const callbackStack: TProps[] = []

function handleMouseDownEvent(event: MouseEvent) {
  const callbackObject = callbackStack[callbackStack.length - 1]
  if (!callbackObject) {
    return
  }
  const { ref, callback, shouldRemoveCallback } = callbackObject
  let isContained = false

  if (
    ref &&
    Array.isArray(ref) &&
    ref.some((eachElement) => eachElement?.contains(event.target as HTMLElement))
  ) {
    isContained = true
  } else if (ref && !Array.isArray(ref) && ref.contains(event.target as HTMLElement)) {
    isContained = true
  }

  if (!isContained) {
    if (shouldRemoveCallback) {
      callbackStack.splice(callbackStack.length - 1, 1)
    }
    callback(event)
  }
}

export const useOnOutsideClick = (
  ref: TRefs,
  callback: (event: MouseEvent) => void,
  state: boolean,
  uid: string,
  shouldRemoveCallback = true
): void => {
  useEffect(() => {
    if (ref && state && uid) {
      callbackStack.push({ ref, callback, uid, shouldRemoveCallback })
      if (callbackStack.length === 1) {
        document.addEventListener('mousedown', handleMouseDownEvent)
      }

      return () => {
        const activeElementIndex = callbackStack.findIndex((stack) => stack.uid === uid)
        if (activeElementIndex >= 0) {
          callbackStack.splice(activeElementIndex, 1)
        }
        if (callbackStack.length === 0) {
          document.removeEventListener('mousedown', handleMouseDownEvent)
        }
      }
    }
  }, [ref, state, uid])

  useEffect(() => {
    if (!state && callbackStack.length > 0) {
      const activeElementIndex = callbackStack.findIndex((stack) => stack.uid === uid)
      if (activeElementIndex >= 0) {
        callbackStack.splice(activeElementIndex, 1)
      }
    }
  }, [state])
}
