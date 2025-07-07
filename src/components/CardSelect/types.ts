import type { InputCustomProps } from '../Input/types'
import type { TChipsProps } from '../Chips/types'
import type { CARD_SELECT_TYPES } from '../../consts'
import type { TPopoverProps } from '../Popover/types'
import type { TTooltipProps } from '../Tooltip/types'

export interface TCardSelectProps extends IFormCompProps {
  id?: number | string
  type?: CARD_SELECT_TYPES
  title: string
  subtext?: string
  description?: string
  chips?: TChipsProps[]
  inputProps?: InputCustomProps
  className?: string
  disabled?: boolean
  handleCardSelectValue?: (isChecked: boolean) => void
  dataId?: string
  additionalInfo?: TInfoList
  selectedCard?: number
  value?: number | string
  handleChange?: (selected: number | string) => void
  isSelected?: boolean
  cardValue?: number | string
  illustration?: string
  icon?: TSelectIconProps
  popoverAddons?: TPopoverProps
  tooltipAddons?: TTooltipProps
}
export interface TCardSelectGroupProps extends IFormCompProps {
  cards: TCardSelectProps[]
  handleChange?: (selected: number | string) => void
  value: number | string
  cardsGroupDisable?: boolean
  cardsGroupType?: CARD_SELECT_TYPES
  className?: string
}

export type TInfoList = TInfoListItem[]

export type TInfoListItem = {
  key: string
  value: string
  id?: number | string
}
