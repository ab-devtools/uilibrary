import type { JSX, ReactNode } from 'react'
import type { ISVGIconProps } from '../SVGIcons/types'

export interface TSideNavigationPropTypes {
  className?: string
  logo?: string
  logoClosed?: string
  actionElm?: JSX.Element
  showAction?: boolean
  children: ReactNode
  pinSidebar?: boolean
  isOpen?: boolean
  setOpen?: (arg: boolean) => void
  sidebarOpenIconProps?: ISVGIconProps
  sidebarCloseIconProps?: ISVGIconProps
}

export interface TBlock {
  children: ReactNode
  label?: string
  isOpen?: boolean
  className?: string
}