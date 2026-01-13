import type { ReactElement } from 'react'
import type { IFormCompProps } from '../../types/globalTypes'

export enum Positions {
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  MIDDLE_LEFT = 'middle-left',
  MIDDLE_RIGHT = 'middle-right',
  BOTTOM_CENTER = 'bottom-center',
  TOP_CENTER = 'top-center'
}

export interface TTooltipProps extends IFormCompProps {
  text: string | ReactElement
  position?: Positions
  size?: 'large' | 'small'
  className?: string
  elemRef?: HTMLElement | null
  id?: string | number
  hovered?: boolean
  timer?: number
}
