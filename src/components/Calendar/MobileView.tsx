import React, { useEffect, useRef } from 'react'
import ReactCalendar from 'react-calendar'
import type { IMobileViewProp } from './types'
import dayjs from 'dayjs'
import { Text } from '../Text'
import { getMonthByIndex } from '../../utils/helpers'
import { useVirtualizer } from '@tanstack/react-virtual'

const TOTAL_MONTHS = 10000
const MIDDLE_INDEX = Math.floor(TOTAL_MONTHS / 2)

export const MobileView = ({
  draftRange,
  draftValue,
  locale,
  dataId,
  handleDayClick,
  getTileClassName,
  ...props
}: IMobileViewProp) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const didInitScrollRef = useRef<boolean>(false)

  const virtualizer = useVirtualizer({
    count: TOTAL_MONTHS,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 340,
    overscan: 3
  })

  const getSelectedMonthIndex = () => {
    const baseDate = dayjs()
    let targetDate: dayjs.Dayjs | null = null
    if (Array.isArray(draftRange) && draftRange[0]) {
      targetDate = dayjs(draftRange[0])
    } else if (draftValue instanceof Date) {
      targetDate = dayjs(draftValue)
    }
    if (!targetDate) return MIDDLE_INDEX

    const monthDiff = targetDate.startOf('month').diff(baseDate.startOf('month'), 'month')
    return MIDDLE_INDEX + monthDiff
  }

  const scrollToSelectedMonth = (index: number) => {
    requestAnimationFrame(() => {
      virtualizer.scrollToIndex(index, {
        align: 'start'
      })
    })
  }

  useEffect(() => {
    if (!containerRef.current) return

    const index = getSelectedMonthIndex()
    console.log(index)
    if (!index) return
    didInitScrollRef.current = true
    scrollToSelectedMonth(index)
  }, [draftValue, draftRange])

  return (
    <div ref={containerRef} className="mobile-infinite-calendar">
      <div
        style={{
          height: virtualizer.getTotalSize(),
          position: 'relative'
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const month = getMonthByIndex(virtualRow.index - MIDDLE_INDEX)

          return (
            <div
              key={virtualRow.key}
              ref={virtualizer.measureElement}
              data-index={virtualRow.index}
              className="mobile-calendar-month"
              style={{
                transform: `translateY(${virtualRow.start}px)`
              }}
            >
              <Text weight="bold" className="month-title">
                {month.toDate().toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
              </Text>
              <ReactCalendar
                {...props}
                locale={locale}
                data-id={dataId}
                allowPartialRange
                showNeighboringMonth={false}
                onClickDay={handleDayClick}
                value={draftValue || null}
                tileClassName={({ date }) => getTileClassName(date)}
                activeStartDate={month.toDate()}
                showNavigation={false}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
