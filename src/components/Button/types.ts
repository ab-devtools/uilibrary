import type { ButtonHTMLAttributes, LegacyRef, PropsWithChildren, ReactElement } from 'react'
import type { TSVGIconType } from '../SVGIcons/types'
import type { TClickEventType, TIconSize, TSVGIconComponent } from '../../types/globalTypes'

export interface TButtonPropTypes
  extends PropsWithChildren<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'children'>> {
  id?: string
  disabled?: boolean
  buttonActionType?: 'submit' | 'button' | 'reset'
  buttonText?: string | ReactElement
  className?: string
  type?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'text'
  size?: 'small' | 'medium' | 'large'
  isLoading?: boolean
  iconProps?: {
    size?: TIconSize
    type?: TSVGIconType
    alignment?: string
    Component?: TSVGIconComponent
  }
  onClick?: (event: TClickEventType) => void
  formId?: string
  dataId?: string
  refHandler?: LegacyRef<HTMLButtonElement> | undefined
}
