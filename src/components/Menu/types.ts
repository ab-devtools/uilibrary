import type { ReactNode } from 'react'
import type {
  TCallBackFn,
  TItemLabel,
  TItemValue,
  TSelectIconProps,
  TTooltipPosition
} from '../../types/globalTypes'

export type TMenuItem = {
  label: TItemLabel
  value: TItemValue
  iconProps?: TSelectIconProps
  handler?: TCallBackFn
  disabled?: boolean
  dataId?: string
  meta?: string
}

export type TMenuProps = {
  className?: string
  menuItems?: TMenuItem[]
  parentRef: HTMLElement | null
  onClose: TCallBackFn
  position?: TTooltipPosition // 'right' | 'left' | 'top' | 'bottom'
  isOpen: boolean
  withTitleOption?: boolean
  children?: ReactNode
  additionalRef?: HTMLElement | null
  containerRef?: HTMLElement | Window | null
}

export type TNestedMenuItemProps = {
  title: string
  value: string | number
  subItems: TMenuItem[]
  iconProps?: TSelectIconProps
}

export type TNestedMenuProps = {
  menuItems: TNestedMenuItemProps[]
  parentRef: HTMLElement
  onClose: TCallBackFn
  className?: string
  position?: TTooltipPosition
  isOpen?: boolean
  additionalRef?: HTMLElement | null
}
