import type React from 'react'
import type { ReactElement, ReactNode } from 'react'
import type { LinkPropTypes } from '../Link/types'

export interface TPopoverProps extends IFormCompProps {
  clicked?: boolean
  text?: string | ReactElement
  linkAddons?: LinkPropTypes
  linkText?: string
  children?: ReactNode
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'middle-left'
    | 'middle-right'
  className?: string
  elemRef?: HTMLElement
  id?: string | number
  popoverContent?: React.ReactNode
}
