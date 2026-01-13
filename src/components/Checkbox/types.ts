import type { JSX } from 'react'
import type { TPopoverProps } from '../Popover/types'
import type { IFormCompProps } from '../../types/globalTypes'

export interface TCheckboxProps extends IFormCompProps {
  label?: string | JSX.Element
  beforeLink?: string | JSX.Element
  afterLink?: string | JSX.Element
  className?: string
  disabled?: boolean
  required?: boolean
  link?: string
  selectedValue?: boolean
  iconProps?: {
    name: string
  }
  helperText?: string
  onClick?: (isChecked: boolean) => void
  popoverAddons?: TPopoverProps
  isInvalid?: boolean
}
