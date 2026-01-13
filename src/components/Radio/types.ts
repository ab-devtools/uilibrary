import type { ReactElement } from 'react'
import type { IFormCompProps } from '../../types/globalTypes'

export interface TRadioProps extends IFormCompProps {
  showRadioIcon?: boolean
  label?: string | ReactElement
  helperText?: string | ReactElement
  className?: string
  disabled?: boolean
  iconProps?: ReactElement
  isSelected?: boolean
  onClick?: (isChecked: boolean) => void
  dataId?: string
}

export type TRadioOptionItem = {
  value: number | string
  label: string
  helperText?: string | ReactElement
  dataId?: string
}

export interface TRadioGroupProps extends IFormCompProps {
  label?: string | ReactElement
  className?: string
  isHorizontal?: boolean
  selected: number | string
  options: TRadioOptionItem[]
  handleChange?: (selected: number | string) => void
  required?: boolean
  disabled?: boolean
  labelAddons?: ReactElement
}
