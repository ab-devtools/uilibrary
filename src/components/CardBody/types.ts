import type { TButtonPropTypes } from '../Button/types'
import type {ReactNode} from 'react';

export interface TCardBodyProps {
  className?: string
  title?: string
  description?: string
  buttonProps?: {
    primary?: TButtonPropTypes
    secondary: TButtonPropTypes
  }
  illustration?: string
  children?: ReactNode
}
