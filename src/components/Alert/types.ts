import type { JSX } from 'react'
import type { TButtonPropTypes } from '../Button/types'
import type { LinkPropTypes } from '../Link/types'
import type { TSVGIconType } from '../SVGIcons/types'
import type { IFormCompProps, TSVGIconComponent } from '../../types/globalTypes'

export type TAlertTypes = 'grey' | 'success' | 'error' | 'warning' | 'information' | 'discovery'
export type TAlertPosition = 'inline' | 'sticky'

export interface TAlertProps extends IFormCompProps {
  type?: TAlertTypes
  iconProps?: {
    type?: TSVGIconType
    Component?: TSVGIconComponent
  }
  position?: TAlertPosition
  text?: string | JSX.Element
  subtext?: string | JSX.Element
  closeIcon?: boolean
  onClose?: () => void
  buttonProps?: {
    confirm: TButtonPropTypes
    cancel?: TButtonPropTypes
  }
  className?: string
  linkAddons?: LinkPropTypes
}
