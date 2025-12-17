import type { JSX } from 'react'
import type { TButtonPropTypes } from '../Button/types'

export type TSnackbarTypes = 'success' | 'error' | 'warning' | 'information' | 'offline'

export interface TToastProps {
  duration?: number
  type?: TSnackbarTypes
  toastId: number | string
  closeSnackbar?: (id: number | string) => void
  text: string | JSX.Element
  actionProps?: TButtonPropTypes
  autoClose?: boolean
}
export interface TSnackbarProps extends IFormCompProps {
  duration?: number
  position:
    | 'top-center'
    | 'top-right'
    | 'top-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'bottom-left'
}
