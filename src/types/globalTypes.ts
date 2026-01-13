import type { MouseEvent, ReactElement } from 'react'
import type { ISVGIconProps, TSVGIconType } from '../components/SVGIcons/types'

export type TIconSize = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TFormData = {
  [key: string]: any
}

export type TSetValue = (name: string, value: unknown, config?: { [key: string]: unknown }) => void

export type TImageMimeTypes =
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/png'
  | 'image/heic'
  | 'image/heif'
  | 'application/pdf'

export type TItemValue = string | number | null
export type TItemLabel = string | number

export type TSelectedValue = {
  value: TItemValue
  label: TItemLabel
  optionLeftIcon?: TSelectIconProps
  parentId?: TItemValue
}

export type TClickEventType = MouseEvent<HTMLElement>
export type TChangeEventType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>

export type TClickHandler = (e: TClickEventType) => void

export type TSVGIconComponent = (props: ISVGIconProps) => ReactElement

export type TSelectIconProps = {
  type?: TSVGIconType
  size?: TIconSize
  className?: string
  onClick?: TClickHandler
  Component?: TSVGIconComponent
}

export type TSelectOption = {
  value: TItemValue
  label: TItemLabel
  meta?: string
  disabled?: boolean
  children?: TSelectOption[]
  dataId?: string
  parentId?: string | number | null
  optionLeftIcon?: TSelectIconProps
}

export type TSelectOptions = TSelectOption[]

export type TSelectGroupOption = {
  title: string
  dataId?: string
  data: TSelectOptions
}

export type TSelectTreeOption = {
  title: string
  dataId?: string
  parentId?: string | number | null
  data: TSelectOptions
}

export type TSelectGroupOptions = TSelectGroupOption[]
export type TSelectTreeOptions = TSelectTreeOption[]

export type TRangePickerValues = [Date | null, Date | null]

export type TFormValue =
  | string
  | number
  | boolean
  | TSelectOption
  | TItemValue
  | File[]
  | FileReader[]
  | Date
  | TRangePickerValues
  | null
  | TItemValue[]
  | TSelectedValue[]

export type TOnChange = (event: TChangeEventType) => void

export interface IFormCompProps {
  hasError?: boolean
  isValid?: boolean
  value?: TFormValue
  onChange?: TOnChange
  dataId?: string
  name?: string
  setFieldValue?: (
    name: string,
    value: TFormValue,
    shouldValidate?: { shouldValidate: boolean }
  ) => void
}

export type TTooltipPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'middle-left'
  | 'middle-right'

export type TTooltipInfo = {
  hasTriangle?: boolean
  initialPosition: TTooltipPosition
  elemRef: HTMLElement | null
  tooltipRef: HTMLElement | null
}

export type TCallBackFn = () => void

export type TDirtyFields = Partial<Readonly<{ [x: string]: unknown }>>
