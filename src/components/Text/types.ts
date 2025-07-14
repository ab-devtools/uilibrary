import type { ElementType, MouseEvent, ReactNode } from 'react'

export type TTextTypes =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'disabled'
  | 'inverse'
  | 'selected'
  | 'brand'
  | 'danger'
  | 'warning'
  | 'success'
  | 'information'
  | 'discovery'

export type TTextSize = 'xxsmall' | 'xsmall' | 'small' | 'standard' | 'medium' | 'large'
export type TTextWeight = 'regular' | 'semibold' | 'bold' | 'bolder'

export interface TextPropTypes {
  id?: string
  as?: ElementType
  title?: string
  children?: ReactNode
  type?: TTextTypes
  size?: TTextSize
  weight?: TTextWeight
  className?: string
  dataId?: string
  onClick?: (event: MouseEvent<HTMLElement>) => void
}
