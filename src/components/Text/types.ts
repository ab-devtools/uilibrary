import type { ElementType, MouseEvent, ReactNode } from 'react'

export type TTextTypes =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'disabled'
  | 'inverse'
  | 'brand-light'
  | 'brand-dark'
  | 'danger-light'
  | 'danger-dark'
  | 'warning-light'
  | 'warning-dark'
  | 'success-light'
  | 'success-dark'
  | 'information-light'
  | 'information-dark'
  | 'discovery-light'
  | 'discovery-dark'

export type TTextSize = 'xxsmall' | 'xsmall' | 'small' | 'standard' | 'medium' | 'large'
export type TTextWeight = 'regular' | 'semibold' | 'bold' | 'bolder'
export type TTextLineHeight = 'xxsmall' | 'xsmall' | 'small' | 'standard' | 'medium' | 'large'

export interface TextPropTypes {
  id?: string
  as?: ElementType
  title?: string
  children?: ReactNode
  type?: TTextTypes
  size?: TTextSize
  weight?: TTextWeight
  lineHeight?: TTextLineHeight
  className?: string
  dataId?: string
  onClick?: (event: MouseEvent<HTMLElement>) => void
}
