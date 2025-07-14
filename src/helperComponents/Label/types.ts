import type { JSX, ReactNode } from 'react'
import type { ElementType } from 'react'
import type {
  TTextLineHeight,
  TTextTypes,
  TTextWeight,
  TTextSize
} from '../../components/Text/types'

export interface LabelPropTypes {
  required?: boolean
  disabled?: boolean
  invalid?: boolean
  text?: ReactNode
  className?: string
  labelAddons?: JSX.Element
  dataId?: string
  as?: ElementType
  type?: TTextTypes
  size?: TTextSize
  weight?: TTextWeight
  lineHeight?: TTextLineHeight
}
