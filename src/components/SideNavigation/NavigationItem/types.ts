import type { JSX, ReactNode } from 'react'
import type { ISVGIconProps } from '../../SVGIcons/types'
import type { TBadgeProps } from '../../Badge/types'

export enum NavigationItemTypes {
  MAIN = 'main',
  SUB = 'sub',
  HEADER = 'header',
  USER = 'user',
  PRODUCT = 'product',
  ACTION = 'action'
}

export interface TNavigationLinkPropTypes {
  As: () => JSX.Element
  expandIconProps?: ISVGIconProps
  type: NavigationItemTypes
  isOpen: boolean
  iconName?: string
  showBadge?: boolean
  expandable?: boolean
  showAction?: boolean
  actionElm?: JSX.Element
  active?: boolean
  badgeProps?: TBadgeProps
  children?: ReactNode
}
