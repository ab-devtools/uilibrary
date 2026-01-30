import React, { useId, useRef, useState } from 'react'
import type { ICalendarProp } from './types'
import { CalendarPopup } from './CalendarPopup'
import {
  useGetElemPositions,
  useGetHasBottomSpace,
  useGetHasTopSpace,
  useHideOnResize,
  useOnOutsideClick,
  useRecalculateDropdownPosition
} from '../../hooks'
import { useChangePositionsOnScroll } from '../../hooks/useChangePositionsOnScroll'
import { DROPDOWN_AND_INPUT_GAP } from '../../consts'

export const Calendar = ({
  children,
  shouldRecalculatePosition = false,
  ...props
}: ICalendarProp) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const childrenRef = useRef<HTMLDivElement | null>(null)
  const [calendarRef, setCalendarRef] = useState<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const closeCalendarPopup = () => setIsOpen(false)

  const hasTopSpace = useGetHasTopSpace({
    element: calendarRef,
    input: childrenRef.current
  })

  const { hasBottomSpace } = useGetHasBottomSpace({
    element: calendarRef,
    input: childrenRef.current
  })

  const { bottom, top, left } = useGetElemPositions(childrenRef.current)

  useChangePositionsOnScroll({
    parentElement: childrenRef?.current,
    childElement: calendarRef,
    hasBottomSpace
  })

  useHideOnResize(closeCalendarPopup)

  useOnOutsideClick([childrenRef.current, calendarRef], closeCalendarPopup, isOpen, useId())
  useRecalculateDropdownPosition({
    shouldRecalculatePosition,
    isOpen,
    anchorRef: childrenRef,
    floatingRef: calendarRef
  })

  return (
    <div className="calendar" ref={containerRef}>
      <div ref={childrenRef} onClick={() => setIsOpen(true)}>
        {children}
      </div>
      {isOpen && (
        <div
          className="calendar-popup-container"
          style={{
            left,
            ...(hasBottomSpace || !hasTopSpace
              ? {
                  top: bottom + DROPDOWN_AND_INPUT_GAP
                }
              : {
                  bottom: window.innerHeight - top + DROPDOWN_AND_INPUT_GAP,
                  maxHeight: top - DROPDOWN_AND_INPUT_GAP
                })
          }}
          ref={setCalendarRef}
        >
          <CalendarPopup {...props} />
        </div>
      )}
    </div>
  )
}
