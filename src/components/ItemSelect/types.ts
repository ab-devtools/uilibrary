import type { ReactElement } from 'react'
import type { IFormCompProps, TSelectIconProps } from '../../types/globalTypes'
export interface TItemSelectProps extends IFormCompProps {
  id?: number | string
  image?: string
  title?: string
  subtitle?: string
  leftIconProps?: ReactElement
  className?: string
  disabled?: boolean
  handleItemSelectValue?: (isChecked: boolean) => void
  value?: number | string
  handleChange?: (selected: number | string) => void
  isSelected?: boolean
  itemValue?: number | string
  rightIconProps?: TSelectIconProps
  deSelectable?: boolean
  rightContent?: ReactElement
}
export interface TItemSelectGroupProps extends IFormCompProps {
  isHorizontal?: boolean
  className?: string
  items: TItemSelectProps[]
  iconGroup?: TSelectIconProps
  handleChange?: (selected: number | string) => void
  value: number | string
  deSelectable?: boolean
}
