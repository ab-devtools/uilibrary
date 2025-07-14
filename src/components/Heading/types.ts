import type { ElementType, ReactNode } from 'react'
import type { TTextTypes, TTextWeight } from '../Text/types'

type THeadingSizes = 'xsmall' | 'small' | 'standard' | 'medium' | 'large' | 'xlarge'
type THeadingLineHeight = 'xsmall' | 'small' | 'standard' | 'medium' | 'large' | 'xlarge'

export interface HeadingPropTypes {
  children?: ReactNode
  type?: ElementType
  color?: TTextTypes
  size?: THeadingSizes
  weight?: TTextWeight
  lineHeight?: THeadingLineHeight
  className?: string
  onClick?: (event: TClickEventType) => void
  dataId?: string
}
