import type { InputHTMLAttributes, ReactElement, RefObject } from 'react'
import type { IFormCompProps, TChangeEventType, TClickEventType } from '../../types/globalTypes'
export interface OtpCustomProps
  extends IFormCompProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'size' | 'onFocus' | 'value' | 'onChange' | 'autoComplete'
    > {
  className?: string
  size?: 'large' | 'small'
  currentValue?: string
  error?: string | ReactElement
  label?: string | ReactElement
  count: number
  pattern?: string
  disabled?: boolean
  required?: boolean
  ref?: RefObject<HTMLInputElement>
  style?: Record<string, string>
  type?: 'text' | 'number' | 'time' | 'password' | 'email' | 'file' | 'tel' | 'date' | 'numeric'
  handleChange?: (event: TChangeEventType, value: string) => void
  placeholder?: string
  helperText?: string
  successMessage?: string
  hasError?: boolean
  onFocus?: (event: TClickEventType) => void
  autoFocus?: boolean
  allowLetters?: boolean
}
