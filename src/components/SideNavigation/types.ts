import type { JSX, ReactNode } from 'react'
import type { ISVGIconProps } from '../SVGIcons/types'

export interface SideNavigationControls {
  isPined?: boolean
  isOpen?: boolean
  onOpen?: (open: boolean) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onPin?: () => void
  onClose?: () => void
}

export interface TSideNavigationPropTypes extends SideNavigationControls {
  className?: string
  logo?: string
  logoUrl?: string
  logoClosed?: string
  actionElm?: JSX.Element
  showAction?: boolean
  children: ReactNode
  pinSidebar?: boolean
  sidebarOpenIconProps?: ISVGIconProps
  sidebarCloseIconProps?: ISVGIconProps
}

export interface TBlock {
  children: ReactNode
  label?: string
  isOpen?: boolean
  className?: string
}
