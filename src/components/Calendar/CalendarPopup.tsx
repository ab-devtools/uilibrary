import React, { useState, useEffect, useMemo } from 'react'
import type { TRangeValue, TCalendarPropTypes, TCalendarValue, TValuePiece } from './types'
import { Button } from '../Button'
import { Switcher } from '../Switcher'
import { isSameDay } from 'date-fns'
import dayjs from 'dayjs'
import { Text } from '../Text'
import classNames from 'classnames'
import {
  combineDateTime,
  formatDateByPattern,
  formatTime,
  isSameDate,
  isSameRange,
  isValidDate,
  orderRangeDate
} from '../../utils/helpers'
import { MobileView } from './MobileView'
import { DesktopView } from './DesktopView'
import { Input } from '../Input'
import { IconArrowRight } from '../SVGIcons'

export const CalendarPopup = ({
  isRange,
  dataId,
  onChange,
  canControlRange,
  hasInputs,
  withTime,
  fastActions,
  selectedValue,
  showApplyButtons,
  resetButtonText = 'Reset',
  applyButtonText = 'Apply',
  rangeControlText = 'Apply range',
  locale = 'en-US',
  maxYear = 2050,
  formatDate = 'MM/DD/YYYY',
  ...props
}: TCalendarPropTypes) => {
  const [canRangeSelect, setCanRangeSelect] = useState(isRange)
  const [value, setValue] = useState<TCalendarValue>()
  const [draftValue, setDraftValue] = useState<TValuePiece>()
  const [draftRange, setDraftRange] = useState<TRangeValue>([null, null])
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768)
  const [startDate, setStartDate] = useState<string>('')
  const [startTime, setStartTime] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')

  const hasPendingChanges = useMemo(() => {
    if (canRangeSelect) {
      const [draftStart, draftEnd] = draftRange
      if (Array.isArray(value)) {
        const [valueStart, valueEnd] = value

        if (!draftStart || !draftEnd) return true

        return (
          isSameDay(draftStart as Date, valueStart as Date) &&
          isSameDay(draftEnd as Date, valueEnd as Date)
        )
      } else {
        return !draftStart || !draftEnd
      }
    } else {
      return !draftValue || isSameDay(draftValue, value as Date)
    }
  }, [canRangeSelect, draftRange, draftValue, value])

  const canReset = useMemo(() => {
    if (canRangeSelect) {
      const [draftStart, draftEnd] = draftRange
      return !draftStart && !draftEnd
    } else {
      return !draftValue
    }
  }, [canRangeSelect, draftRange, draftValue])

  const handleChange = (date: TCalendarValue) => {
    if (canRangeSelect) {
      setDraftRange(date as TRangeValue)
    } else {
      const selectedDate = dayjs(date as TValuePiece).format('MM/DD/YYYY')
      const time = dayjs(date as TValuePiece).format('HH:mm')
      setStartDate(selectedDate)
      setStartTime(time)
      setDraftValue(date as TValuePiece)
    }
    if (onChange && !showApplyButtons) {
      onChange(date)
      setValue(date)
    }
  }

  const handleSetStartAndEndDateInputValues = (start: TValuePiece, end?: TValuePiece) => {
    if (end) {
      const orderedDate = orderRangeDate(start, end)
      const selectedStartDate = dayjs(orderedDate[0])
      const selectedEndDate = dayjs(orderedDate[1])

      setStartTime(selectedStartDate.format('HH:mm'))
      setEndTime(selectedEndDate.format('HH:mm'))
      setStartDate(selectedStartDate.format(formatDate))
      setEndDate(selectedEndDate.format(formatDate))
    } else if (isValidDate({ date: `${start}` })) {
      setStartDate(dayjs(start).format(formatDate))
      setStartTime(dayjs(start).format('HH:mm'))
    }
  }

  const handleDayClick = (date: Date) => {
    if (!canRangeSelect) {
      handleChange(date)
      return
    }
    setDraftRange(([start, end]) => {
      if (!start) {
        return [date, null]
      }
      if (start && !end) {
        return orderRangeDate(date, start)
      }
      return [date, null]
    })
  }

  const handleReset = () => {
    setValue(null)
    setDraftValue(null)
    setDraftRange([null, null])
  }

  const handleApply = () => {
    const date = canRangeSelect ? draftRange : draftValue
    setValue(date)
    if (onChange) {
      onChange(date as TCalendarValue)
    }
  }

  const getTileClassName = (date: Date) => {
    if (!canRangeSelect) return null
    const [start, end] = draftRange
    if (!start) return null
    if (!end && dayjs(date).isSame(start, 'day')) {
      return 'react-calendar__tile--rangeStart react-calendar__tile--rangeEnd'
    }
    if (end && dayjs(date).isSame(start, 'day')) {
      return 'react-calendar__tile--active react-calendar__tile--range react-calendar__tile--rangeStart'
    }
    if (end && dayjs(date).isSame(end, 'day')) {
      return 'react-calendar__tile--active react-calendar__tile--range react-calendar__tile--rangeEnd'
    }
    if (end && dayjs(date).isAfter(start, 'day') && dayjs(date).isBefore(end, 'day')) {
      return 'react-calendar__tile--active react-calendar__tile--range'
    }
    return null
  }

  const onFastActionSelect = (value: Date | [Date, Date]) => {
    if (Array.isArray(value)) {
      setDraftRange(value)
    } else {
      setDraftValue(value)
    }
  }

  const isSelectedFastAction = (date: Date | [Date, Date]) => {
    if (Array.isArray(date)) {
      return isSameRange(date, draftRange)
    } else {
      if (!draftValue) return false
      return isSameDate(date, draftValue as Date)
    }
  }

  const onChangeRangeControl = () => {
    setCanRangeSelect((prev) => !prev)
    setValue(null)
    setDraftRange([null, null])
    setDraftValue(null)
    setStartTime('')
    setEndTime('')
    setStartDate('')
    setEndDate('')
  }

  const onStartDateBlur = () => {
    const dateTime = combineDateTime({ date: startDate, time: startTime })
    if (!dateTime || !isValidDate({ date: startDate })) {
      setStartDate('')
      setStartTime('')
      return
    }
    if (canRangeSelect) {
      setDraftRange(orderRangeDate(dateTime, combineDateTime({ date: endDate, time: endTime })))
    } else {
      setDraftValue(dateTime)
    }
  }

  const onEndDateBlur = () => {
    const dateTime = combineDateTime({ date: endDate, time: endTime })
    if (!dateTime || !isValidDate({ date: endDate })) {
      setEndDate('')
      setEndTime('')
      return
    }
    if (canRangeSelect) {
      setDraftRange(orderRangeDate(combineDateTime({ date: startDate, time: startTime }), dateTime))
    } else {
      setDraftValue(dateTime)
    }
  }

  useEffect(() => {
    if (!showApplyButtons) {
      setValue(draftValue || draftRange)
    }
    handleSetStartAndEndDateInputValues(...(draftRange || draftValue))
  }, [draftValue, draftRange, showApplyButtons])

  useEffect(() => {
    if (!selectedValue) return
    if (canRangeSelect) {
      if (Array.isArray(selectedValue)) {
        setDraftRange(selectedValue)
        handleSetStartAndEndDateInputValues(...selectedValue)
      } else {
        setDraftValue(selectedValue)
      }
    }
  }, [selectedValue])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="react-calendar-wrapper">
      {canControlRange && (
        <div className="header-control-wrapper">
          <Switcher
            size="small"
            selectedValue={canRangeSelect}
            label={rangeControlText}
            onClick={() => onChangeRangeControl()}
          />
        </div>
      )}
      <div className="react-calendar-container">
        {fastActions?.length && (
          <div className="calendar-fast-actions">
            {fastActions.map((item, i) => (
              <div
                key={i}
                className={classNames('fast-action', {
                  ['fast-action-active']: isSelectedFastAction(item.value)
                })}
                onClick={() => onFastActionSelect(item.value)}
              >
                <Text className="fast-action__text" type="secondary">
                  {item.label}
                </Text>
              </div>
            ))}
          </div>
        )}
        <div className="flexbox flex-direction--column calendar-wrapper">
          {hasInputs && (
            <div className="date-input-wrapper">
              <div
                className={classNames('date-input-wrapper__left flexbox flex-wrap--nowrap', {
                  ['full-left-section']: !canRangeSelect
                })}
              >
                <Input
                  className={classNames('date-input', {
                    ['date-input-full']: !withTime
                  })}
                  placeholder="MM/DD/YYYY"
                  value={startDate}
                  handleChange={(e) => setStartDate(formatDateByPattern(e.target.value))}
                  onBlur={onStartDateBlur}
                />
                {withTime && (
                  <Input
                    className="time-input"
                    placeholder="00:00"
                    value={startTime}
                    handleChange={(e) => setStartTime(formatTime(e.target.value))}
                    onBlur={onStartDateBlur}
                  />
                )}
              </div>
              {canRangeSelect && (
                <>
                  <div className="date-input-middle-arrow">
                    <IconArrowRight type="tertiary" size="small" />
                  </div>
                  <div className="date-input-wrapper__right flexbox flex-wrap--nowrap">
                    <Input
                      className={classNames('date-input', {
                        ['date-input-full']: !withTime
                      })}
                      placeholder="MM/DD/YYYY"
                      value={endDate}
                      handleChange={(e) => setEndDate(formatDateByPattern(e.target.value))}
                      onBlur={onEndDateBlur}
                    />
                    {withTime && (
                      <Input
                        className="time-input"
                        placeholder="00:00"
                        value={endTime}
                        handleChange={(e) => setEndTime(formatTime(e.target.value))}
                        onBlur={onEndDateBlur}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          )}
          {isMobile ? (
            <MobileView
              {...props}
              locale={locale}
              dataId={dataId}
              maxYear={maxYear}
              draftRange={draftRange}
              draftValue={draftValue}
              handleDayClick={handleDayClick}
              getTileClassName={getTileClassName}
            />
          ) : (
            <DesktopView
              {...props}
              locale={locale}
              dataId={dataId}
              maxYear={maxYear}
              draftRange={draftRange}
              draftValue={draftValue}
              canRangeSelect={canRangeSelect}
              handleDayClick={handleDayClick}
              getTileClassName={getTileClassName}
            />
          )}
        </div>
      </div>
      {showApplyButtons && (
        <div className="calendar-actions">
          <Button
            type="tertiary"
            disabled={canReset}
            buttonText={resetButtonText}
            onClick={handleReset}
          />
          <Button
            type="primary"
            disabled={hasPendingChanges}
            buttonText={applyButtonText}
            onClick={handleApply}
          />
        </div>
      )}
    </div>
  )
}
