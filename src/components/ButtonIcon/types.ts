import type { ButtonHTMLAttributes, LegacyRef, PropsWithChildren } from 'react'
import type { TSVGIconType } from '../SVGIcons/types'

export interface TButtonIconPropTypes
  extends PropsWithChildren<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'children'>> {
  id?: string
  disabled?: boolean
  buttonActionType?: 'submit' | 'button' | 'reset'
  className?: string
  size?: 'small' | 'medium' | 'large'
  isLoading?: boolean
  iconProps: {
    Component: TSVGIconComponent
    type?: TSVGIconType
  }
  onClick?: (event: TClickEventType) => void
  formId?: string
  dataId?: string
  refHandler?: LegacyRef<HTMLButtonElement> | undefined
}
