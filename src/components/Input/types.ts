import type { InputHTMLAttributes, ReactElement, RefObject } from 'react'
import type { ISVGIconProps } from '../SVGIcons/types'
import type { TTooltipProps } from '../Tooltip/types'
import type { IFormCompProps, TChangeEventType, TClickEventType } from '../../types/globalTypes'
export interface InputCustomProps
  extends IFormCompProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'size' | 'onFocus' | 'value' | 'onChange' | 'autoComplete'
    > {
  mask?: string
  format?: string
  prefix?: string
  maskChar?: string | null
  maskPlaceholder?: string | null
  className?: string
  size?: 'large' | 'small'
  currentValue?: string
  error?: string | ReactElement
  label?: string | ReactElement
  leftIconProps?: ISVGIconProps | null
  rightIconProps?: ISVGIconProps
  disabled?: boolean
  required?: boolean
  readonly?: boolean
  ref?: RefObject<HTMLInputElement>
  style?: Record<string, string>
  type?: 'text' | 'number' | 'time' | 'password' | 'email' | 'file' | 'tel' | 'date' | 'numeric'
  handleChange?: (event: TChangeEventType, value: string) => void
  placeholder?: string
  datePlaceHolderText?: string
  helperText?: string
  successMessage?: string
  maxCount?: number
  onFocus?: (event: TClickEventType) => void
  hideCounter?: boolean
  allowNegative?: boolean
  currencySymbol?: string
  separatorSymbol?: string
  allowLeadingZeros?: boolean
  thousandSeparator?: string
  labelAddons?: ReactElement
  autoComplete?: string
  witUpperCase?: boolean
  allowEmptyFormatting?: boolean
  isTrimValues?: boolean
  isAllowed?: (values: {
    formattedValue: string
    value: string
    floatValue: number | undefined
  }) => boolean
}

interface IPasswordValidationRule {
  label: string
  test: (password: string) => boolean
  dataId?: string
}

export interface InputPasswordsProps extends InputCustomProps {
  validations: IPasswordValidationRule[]
  onValidationChange?: (isValid: boolean) => void
  onPasswordShow?: (isValid: boolean) => void
  dataId?: string
  hasError?: boolean
  tooltipAddons?: TTooltipProps
  capsLockText?: string
  isCapsLockOn?: boolean
  setIsCapsLockOn?: (event: boolean) => void
  id: string
  className?: string
}
