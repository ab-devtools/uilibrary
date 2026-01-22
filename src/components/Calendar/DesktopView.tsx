import React, { useEffect, useRef, useState } from 'react'
import ReactCalendar from 'react-calendar'
import type { IDesktopViewProp } from './types'
import dayjs from 'dayjs'
import { Select } from '../Select'
import { getMonthOptions } from './options'
import { IconChevronLeft, IconChevronRight } from '../SVGIcons'
import classNames from 'classnames'
import { getYearOptions } from '../../utils/helpers'

const MIN_YEAR = 1900

export const DesktopView = ({
  dataId,
  canRangeSelect,
  handleDayClick,
  draftValue,
  draftRange,
  getTileClassName,
  locale = 'en-US',
  selectedValue,
  maxYear = new Date().getFullYear(),
  ...props
}: IDesktopViewProp) => {
  const didInitScrollRef = useRef<boolean>(false)
  const [activeStartDate, setActiveStartDate] = useState<Date>(new Date())

  const nextMonthStartDate = dayjs(activeStartDate).add(1, 'month').startOf('month').toDate()

  const handleMonthChange = (month?: TItemValue) => {
    if (!month) return
    setActiveStartDate((prev) => new Date(prev.getFullYear(), +month, 1))
  }

  const handleYearChange = (year?: TItemValue) => {
    if (!year) return
    setActiveStartDate((prev) => new Date(+year, prev.getMonth(), 1))
  }

  const goToPrevMonth = () => {
    setActiveStartDate((prev) => {
      const prevDate = new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
      if (prevDate.getFullYear() < MIN_YEAR) {
        return prev
      }
      return prevDate
    })
  }

  const goToNextMonth = () => {
    setActiveStartDate((prev) => {
      const nextDate = new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
      if (nextDate.getFullYear() > maxYear) {
        return prev
      }
      return nextDate
    })
  }

  const getSelectedMonth = (): Date => {
    let target = dayjs().startOf('month')
    if (!didInitScrollRef.current) {
      if (selectedValue instanceof Date) {
        target = dayjs(selectedValue).startOf('month')
      } else if (Array.isArray(selectedValue) && selectedValue[0]) {
        target = dayjs(selectedValue[0]).startOf('month')
      }
    } else {
      if (draftValue instanceof Date) {
        target = dayjs(draftValue).startOf('month')
      } else if (Array.isArray(draftRange) && draftRange[0]) {
        target = dayjs(draftRange[0]).startOf('month')
      }
    }

    return target.toDate()
  }

  const yearOptions = getYearOptions(MIN_YEAR, maxYear)
  const monthOptions = getMonthOptions(locale)

  useEffect(() => {
    const date = getSelectedMonth()
    didInitScrollRef.current = true
    setActiveStartDate(dayjs(date).startOf('month').toDate())
  }, [selectedValue, draftValue, draftRange])
  return (
    <div className="desktop-calendar">
      <div className="desktop-navigation">
        <IconChevronLeft onClick={goToPrevMonth} className="cursor-pointer" />
        <div className="navigation-selects">
          <div
            className={classNames('desktop-navigation__left pr-32', {
              ['single-calendar']: !canRangeSelect
            })}
          >
            <Select
              size="small"
              setSelectedItem={(m) => handleMonthChange(Number(m))}
              selectedItem={activeStartDate.getMonth()}
              options={monthOptions}
            />
            <Select
              size="small"
              selectedItem={activeStartDate.getFullYear()}
              setSelectedItem={(y) => handleYearChange(Number(y))}
              options={yearOptions}
            />
          </div>
          {canRangeSelect && (
            <div className="desktop-navigation__right pl-32">
              <Select
                size="small"
                options={monthOptions}
                setSelectedItem={(m) => {
                  if (m) {
                    handleMonthChange(Number(m) - 1)
                  }
                }}
                selectedItem={nextMonthStartDate.getMonth()}
              />
              <Select
                size="small"
                selectedItem={nextMonthStartDate.getFullYear()}
                setSelectedItem={(y) => {
                  if (y) {
                    handleYearChange(activeStartDate.getFullYear() - 1)
                  }
                }}
                options={yearOptions}
              />
            </div>
          )}
        </div>
        <IconChevronRight onClick={goToNextMonth} className="cursor-pointer" />
      </div>
      <div className="desktop-calendar-month">
        <ReactCalendar
          {...props}
          locale={locale}
          data-id={dataId}
          allowPartialRange
          showNeighboringMonth={false}
          onClickDay={handleDayClick}
          value={draftValue || draftRange || null}
          tileClassName={({ date }) => getTileClassName(date)}
          activeStartDate={activeStartDate}
          showNavigation={false}
        />
        {canRangeSelect && (
          <ReactCalendar
            {...props}
            locale={locale}
            data-id={dataId}
            allowPartialRange
            showNeighboringMonth={false}
            onClickDay={handleDayClick}
            value={draftValue || draftRange || null}
            tileClassName={({ date }) => getTileClassName(date)}
            activeStartDate={nextMonthStartDate}
            showNavigation={false}
          />
        )}
      </div>
    </div>
  )
}
