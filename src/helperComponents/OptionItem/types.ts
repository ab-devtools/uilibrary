import type { ReactElement } from 'react'
import type { TTooltipProps } from '../../components/Tooltip/types'
import type {
  TItemValue,
  TSelectedValue,
  TSelectIconProps,
  TSelectOption
} from '../../types/globalTypes'

export type TSelectItemProps = {
  isSelected?: boolean
  data: TSelectOption
  className?: string
  onClick: (itemValue: TSelectedValue) => void
  optionLeftIcon?: TSelectIconProps
  labelLeftIconProps?: TSelectIconProps
  OptionRightIconComponent?: (value: TItemValue) => ReactElement
  LabelRightIconComponent?: (value: TItemValue) => ReactElement
  avatar?: string
  disabled?: boolean
  isCheckbox?: boolean
  isRadio?: boolean
  tooltipAddons?: TTooltipProps
  dataId?: string
  withTitleOption?: boolean
}
