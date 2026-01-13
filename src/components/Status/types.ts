import type { ReactElement, ReactNode } from 'react'
import type { ISVGIconProps, TSVGIconType } from '../SVGIcons/types'
import type { IFormCompProps } from '../../types/globalTypes'

export interface TStatusProps extends IFormCompProps {
  text?: string
  children?: ReactNode
  leftIconProps?: ISVGIconProps
  rightIconProps?: ReactElement
  type?: TSVGIconType
  size?: 'large' | 'medium' | 'small'
  className?: string
  withCircle?: boolean
  dataId?: string
}
