import type { CalendarProps } from 'react-calendar'

export type TValuePiece = Date | null

export type TCalendarValue = TValuePiece | [TValuePiece, TValuePiece]

export type TRangeValue = [TValuePiece, TValuePiece]

export interface ICalendarProp extends CalendarProps {
  isRange?: boolean
  dataId?: string
  canControlRange?: boolean
  hasInputs?: boolean
  withTime?: boolean
  maxYear?: number
  onChange?: (date: TCalendarValue) => void
  showApplyButtons?: boolean
  resetButtonText?: string
  applyButtonText?: string
  rangeControlText?: string
  selectedValue?: TCalendarValue
  locale?: 'en-US' | 'ru' | 'hy'
}

export interface IMobileViewProp extends CalendarProps {
  dataId?: string
  locale?: 'en-US' | 'ru' | 'hy'
  draftRange: TRangeValue
  draftValue?: TValuePiece
  handleDayClick: (date: Date) => void
  getTileClassName: (date: Date) => string | null
}

export interface IDesktopViewProp extends CalendarProps {
  dataId?: string
  canRangeSelect?: boolean
  locale?: 'en-US' | 'ru' | 'hy'
  maxYear?: number
  selectedValue?: Date | [Date, Date]
  draftRange: TRangeValue
  draftValue?: TValuePiece
  handleDayClick: (date: Date) => void
  getTileClassName: (date: Date) => string | null
}

export type TSingleDateFastActions = {
  label: string
  value: Date
}

export type TRangeDateFastActions = {
  label: string
  value: [Date, Date]
}

export type TCalendarPropTypes =
  | (ICalendarProp & {
      isRange?: true
      fastActions?: TRangeDateFastActions[]
    })
  | (ICalendarProp & {
      isRange?: false
      fastActions?: TSingleDateFastActions[]
    })

export type TMonthOptionLabel = {
  'en-US': string
  ru: string
  hy: string
}

export type TMonthOption = {
  value: number
  label: TMonthOptionLabel
}