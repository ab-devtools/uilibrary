import React, { useRef, useState } from 'react'
import moment from 'moment'
import DatePicker, { registerLocale } from 'react-datepicker'

import hy from 'date-fns/locale/hy'
import en from 'date-fns/locale/en-GB'
import ru from 'date-fns/locale/ru'
import Input from '../Input'
import { ISimpleDatePickerProps } from './types'
import Label from '../../helperComponents/Label'

registerLocale('hy', hy)
registerLocale('en', en)
registerLocale('ru', ru)

const SimpleDatePicker = (props: ISimpleDatePickerProps): JSX.Element => {
  const {
    value,
    currentDate,
    setFieldValue,
    name,
    label,
    locale = 'hy',
    changeHandler,
    format = 'M/D/YYYY',
    required = false,
    hasError,
    ...rest
  } = props
  const calendarRef = useRef<{ setOpen: (isOpen: boolean) => void | null }>(null)

  const dateInitialValue =
    value !== undefined && Object.prototype.toString.call(value) === '[object Date]'
      ? value
      : currentDate

  const [selectedDate, setSelectedDate] = useState(dateInitialValue)

  const openDatepicker = () => {
    if (calendarRef.current) {
      calendarRef.current?.setOpen(true)
    }
  }

  const onChange = (date: Date) => {
    setSelectedDate(date)

    if (setFieldValue && name) {
      setFieldValue(name, date)
    }
    if (changeHandler) {
      changeHandler(date)
    }
  }

  return (
    <div className="picker-container">
      <Label text={label} required={required} invalid={hasError} />

      <DatePicker
        selected={moment.isDate(selectedDate) ? selectedDate : undefined}
        locale={locale}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={calendarRef}
        customInput={
          <Input
            rightIconProps={{ name: 'calendar', onClick: openDatepicker }}
            currentValue={selectedDate ? moment(selectedDate.toString()).format(format) : ''}
          />
        }
        {...rest}
        onChange={onChange}
      />
    </div>
  )
}

export default SimpleDatePicker
