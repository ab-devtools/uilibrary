import type { ReactNode } from 'react'
import type { TButtonPropTypes } from '../Button/types'
import type { TTabProps } from '../Tab/types'

export type TSideSheet = 'xsmall' | 'small' | 'large'

export type TCheckboxInfo = {
  label: string
  isChecked: boolean
}

export interface TSideSheetPropTypes {
  closeOnOutsideClick?: boolean
  shouldRemoveCallback?: boolean
  size?: TSideSheet
  isLoading?: boolean
  isOpen: boolean
  onClose: (e?: TClickEventType | MouseEvent) => void
  onSubmit?: (isCheckboxSelected: boolean) => void
  position?: 'right' | 'left'
  title?: string
  footerButtons?: {
    cancel: TButtonPropTypes
    confirm: TButtonPropTypes
    extraButton?: TButtonPropTypes
  }
  topLeftActions?: ReactNode
  topRightActions?: ReactNode
  tabItemsProps?: TTabProps
  children?: ReactNode
  className?: string
  scrollToTopOptions?: {
    onPixel: number
  }
  checkboxInfo?: TCheckboxInfo
  headerContent?: ReactNode
  isPositioned?: boolean
  isBodyHidden?: boolean
  isWithDivider?: boolean
  withOverlay?: boolean
}
