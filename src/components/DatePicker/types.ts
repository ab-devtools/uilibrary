import type { ReactDatePickerProps } from 'react-datepicker'
import type { ReactNode } from 'react'

type DatePickerDefaultProps = Omit<IFormCompProps, 'value'> &
  Omit<ReactDatePickerProps, 'onChange' | 'value'>

export interface TDatepickerBaseProps extends DatePickerDefaultProps {
  dataId?: string
  label?: ReactNode
  format?: string
}

export interface ISimpleDatePickerProps extends TDatepickerBaseProps {
  helperText?: string
  dataIdPrefix?: string
  currentDate?: Date | undefined
  changeHandler?: (date: Date) => void
  excludeDates?: Date[]
  minDate?: Date | null
  maxDate?: Date | null
  required?: boolean
  dayjsLocale?: string
  value?: Date
  size?: 'large' | 'small'
  months?: TSelectOptions
}
export interface ITimePickerProps extends TDatepickerBaseProps {
  currentTime?: Date | undefined
  changeHandler?: (date: Date) => void
  required?: boolean
  filterTime?: (date: Date) => boolean
  dayjsLocale?: string
  value?: Date
  size?: 'large' | 'small'
}

export interface IRangeDatePickerProps extends TDatepickerBaseProps {
  currentDates?: TRangePickerValues
  changeHandler: (date: TRangePickerValues) => void
  maxDate?: Date | undefined
  dayjsLocale?: string
  value?: [Date, Date]
}

export type TRangePickerValues = [Date | null, Date | null]

export enum DateFormat {
  LongDate = 'MMMM D, YYYY',
  ShortDate = 'MMM D, YYYY'
}
