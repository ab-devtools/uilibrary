import type { ReactNode } from 'react'
import type { TButtonPropTypes } from '../Button/types'
import type { ISVGIconProps } from '../SVGIcons/types'
import type { TCheckboxProps } from '../Checkbox/types'

export interface TModalPropTypes {
  dataIdPrefix?: string
  closeOnOutsideClick?: boolean
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  titleProps?: {
    title?: string
    size?: 'large' | 'small'
  }
  subtitle?: string
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  buttonProps?: {
    cancel?: TButtonPropTypes
    confirm: TButtonPropTypes
  }

  checkProps?: TCheckboxProps
  closeIcon?: boolean
  children?: ReactNode
  className?: string
  confirmBtnTooltipText?: string
}

export interface TModalConfirmationPropTypes {
  dataIdPrefix?: string
  closeOnOutsideClick?: boolean
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  subtitle?: string
  size?: 'small' | 'large'
  buttonProps?: {
    cancel?: TButtonPropTypes
    deactivate?: TButtonPropTypes
    confirm: TButtonPropTypes
  }
  isFooterInline?: boolean
  iconProps?: ISVGIconProps
  className?: string
}
