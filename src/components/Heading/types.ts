import type { ElementType, ReactNode } from 'react'
import type { TTextTypes, TTextWeight } from '../Text/types'

export type THeadingSizes = 'xsmall' | 'small' | 'standard' | 'medium' | 'large' | 'xlarge'

export interface HeadingPropTypes {
  children?: ReactNode
  type?: ElementType
  color?: TTextTypes
  size?: THeadingSizes
  weight?: TTextWeight
  className?: string
  onClick?: (event: TClickEventType) => void
  dataId?: string
}
