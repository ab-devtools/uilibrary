import type { JSX, ReactNode } from 'react'
import type { ISVGIconProps } from '../../SVGIcons/types'
import type { ReactElement } from 'react'
import type { TSVGIconComponent } from '../../../types/globalTypes'

export enum NavigationItemTypes {
  MAIN = 'main',
  SUB = 'sub',
  HEADER = 'header',
  USER = 'user',
  PRODUCT = 'product',
  ACTION = 'action'
}

export type TActionItemProps = {
  iconProps: TSVGIconComponent
  onClick?: () => void
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
  children?: ReactNode
  actionsList?: TActionItemProps[]
  className?: string
  rightContent?: ReactElement
}
