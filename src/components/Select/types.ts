import type { FormEvent, JSX, LegacyRef, ReactElement, ReactNode } from 'react'
import type { TButtonPropTypes } from '../Button/types'
import type { TTooltipProps } from '../Tooltip/types'
import type { TMenuItem } from '../Menu/types'
import type { TSelectItemProps } from '../../helperComponents/OptionItem/types'
import type {
  IFormCompProps,
  TClickHandler,
  TIconSize,
  TItemValue,
  TSelectedValue,
  TSelectGroupOptions,
  TSelectIconProps,
  TSelectOption,
  TSelectOptions,
  TSelectTreeOptions,
  TSVGIconComponent
} from '../../types/globalTypes'

interface TSelectBaseProps {
  dataIdPrefix?: string
  error?: string
  isLoading?: boolean
  disabled?: boolean
  label?: string | JSX.Element
  placeHolder?: string
  isRequiredField?: boolean
  labelLeftIconProps?: {
    size?: TIconSize
    className?: string
    onClick?: TClickHandler
    Component?: TSVGIconComponent
  }
  optionRightIconComponent?: (value: TItemValue) => ReactElement
  labelRightIconComponent?: (value: TItemValue) => ReactElement
  selectRightIconProps?: TSelectIconProps
  selectRightIconOpenedProps?: TSelectIconProps
  avatar?: string
  size?: 'small' | 'large' | 'medium'
  className?: string
}

export interface TNestedSelectProps {
  options: TSelectOptions
  isRequiredField?: boolean
  label?: string | ReactElement
  placeHolder?: string
  initialSelectedFolderIds?: TItemValue[]
  setSelectedValue: (value: TSelectOption | null) => void
  selected?: TSelectOption | null
  optionRightIconComponent?: (value: TItemValue) => ReactElement
  labelRightIconComponent?: (value: TItemValue) => ReactElement
  avatar?: string
  labelAddons?: ReactElement
}

export type TSelectTranslations = {
  emptyListMainMessage: string
  overflowText?: string
  searchInputPlaceHolder?: string
  emptyListSecondaryMessage?: string
  selectAllLabel?: string
  clearAllLabel?: string
  innerLabel?: string
}

interface TMultiSelectCompProps extends IFormCompProps, TSelectBaseProps {
  maxSelectCount: number
  isSearchAvailable: boolean
  helperText?: string
  scrollableContentStyle: { maxHeight?: number }
  translations: TSelectTranslations
  selectedValues: TSelectedValue[]
  setSelectedValues: (values: TSelectedValue[]) => void
  onItemSelect: (item: TSelectedValue) => void
  onItemDeselect: (item: TSelectedValue) => void
  menuOptions?: TMenuItem[]
  isMultiSelectTree?: boolean
}

export interface TMultySingleTabPropTypes extends TMultiSelectCompProps {
  options: TSelectOptions
}

export interface TMultiSelectGroupedProps extends TMultiSelectCompProps {
  options: TSelectGroupOptions
}

export interface TMultiSelectTreeProps extends TMultiSelectCompProps {
  options: TSelectTreeOptions
}

export type TCheckboxInfo = {
  label: string
  isChecked: boolean
}

export interface TMultiSelectPropTypes extends IFormCompProps, TSelectBaseProps {
  dropdownWidth?: number
  align?: 'left' | 'right'
  helperText?: string
  maxSelectCount?: number
  isSearchAvailable?: boolean
  withTabs?: boolean
  isGrouped?: boolean
  isMultiSelectTree?: boolean
  isRadioGrouped?: boolean
  checkboxInfo?: TCheckboxInfo
  selectedItems?: TSelectedValue[]
  translations: TSelectTranslations
  options: TSelectOptions | TSelectGroupOptions
  setSelectedItems?: (items: TSelectedValue[], isChecked: boolean) => void
  footerButtonProps?: {
    cancel: TButtonPropTypes
    confirm: TButtonPropTypes
  }
  autoApplyOnClose?: boolean
  autoApplyOnChooseItem?: boolean
  labelAddons?: JSX.Element
  className?: string
  isButtonSelect?: boolean
  dataId?: string
}

export interface TButtonSelectPropTypes extends IFormCompProps, TSelectBaseProps {
  dataId?: string
  options: TSelectOptions
  selectedItem?: TItemValue
  setSelectedItem?: (items: TItemValue | undefined) => void
  tooltipAddons?: TTooltipProps
  dropdownWidth?: number
  align?: 'left' | 'right'
  offsets?: {
    top?: number
    left?: number
    right?: number
  }
  type: 'secondary' | 'tertiary'
}

export interface IRenderOptionItemProps extends TSelectItemProps {
  key?: string
  index: number
}

export interface TSingleSelectPropTypes extends IFormCompProps, TSelectBaseProps {
  options: TSelectOptions
  selectedItem?: TItemValue
  setSelectedItem?: (items: TItemValue | undefined) => void
  onInputChange?: (event: FormEvent<HTMLInputElement>) => void
  onInputFormatting?: (value: string) => string
  isSearchable?: boolean
  isDynamicSearchable?: boolean
  trimSearchValue?: boolean
  outerHelperText?: string
  innerHelperText?: string
  labelAddons?: JSX.Element
  tooltipAddons?: TTooltipProps
  isCreateOnOutsideClick?: boolean
  isAllowed?: (values: {
    formattedValue: string
    value: string
    floatValue: number | undefined
  }) => boolean
  renderOptions?: (props: IRenderOptionItemProps) => JSX.Element
  defaultValue?: string
  shouldRecalculateDropdownPosition?: boolean
}

export type TSelectFooterPropTypes = {
  checkboxInfo?: TCheckboxInfo
  hasChange?: boolean
  buttonProps: {
    cancel: TButtonPropTypes
    confirm: TButtonPropTypes
  }
  onCancel: () => void
  onApply: (isChecked: boolean) => void
}

export interface TFilterProps extends IFormCompProps, TSelectBaseProps {
  isLoading?: boolean
  withTabs: boolean
  isGrouped: boolean
  isOpen: boolean
  options: TSelectOptions | TSelectGroupOptions
  selectedItems: TSelectedValue[]
  setSelectedItems: (items: TSelectedValue[]) => void
  footerButtonProps?: {
    cancel: TButtonPropTypes
    confirm: TButtonPropTypes
  }
  closeHandler: () => void
  parentRef: HTMLElement
}

export interface TFilterDropdownContentProps extends IFormCompProps {
  options: TSelectOptions
  labelLeftIconProps?: {
    size?: TIconSize
    className?: string
    onClick?: TClickHandler
  }
  avatar?: string
  footerButtonProps?: {
    cancel: TButtonPropTypes
    confirm: TButtonPropTypes
  }
  optionRightIconComponent?: (value: TItemValue) => ReactElement
  labelRightIconComponent?: (value: TItemValue) => ReactElement
  // closeHandler: () => void
  filterValue: string
  onItemSelect: (item: TSelectedValue) => void
  onItemDeselect: (item: TSelectedValue) => void
  checkIsSelected: (item: TItemValue) => boolean
}

export interface TFilterGroupDropdownContentProps extends IFormCompProps {
  options: TSelectGroupOptions
  labelLeftIconProps?: {
    size?: TIconSize
    className?: string
    onClick?: TClickHandler
  }
  avatar?: string
  footerButtonProps?: {
    cancel: TButtonPropTypes
    confirm: TButtonPropTypes
  }
  optionRightIconComponent?: (value: TItemValue) => ReactElement
  labelRightIconComponent?: (value: TItemValue) => ReactElement
  filterValue: string
  onItemSelect: (item: TSelectedValue) => void
  onItemDeselect: (item: TSelectedValue) => void
  checkIsSelected: (item: TItemValue) => boolean
}

export type TSelectWrapperProps = {
  hasError?: boolean
  children: ReactElement
  size?: 'small' | 'large' | 'medium'
  className?: string
  dropdownWidth?: number
  align?: 'left' | 'right'
  offsets?: {
    top?: number
    left?: number
    right?: number
  }
  toggleDropdown?: () => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  containerRef: HTMLDivElement | null
  setContainerRef: LegacyRef<HTMLDivElement> | undefined
  options?: TSelectOptions
  label?: string | JSX.Element
  placeHolder?: string
  isRequiredField?: boolean
  overflowText?: string
  labelAddons?: JSX.Element
  disabled?: boolean
  dropdownRef: HTMLDivElement | null
  setDropdownRef: LegacyRef<HTMLDivElement>
  selectedValues?: TSelectedValue[]
  dataId?: string
  type?: 'primary' | 'secondary' | 'tertiary'
}

export type TProfileDropdownBodyItems = {
  icon?: TSVGIconComponent
  url?: string
  onclick?: () => void
  rightInfoProps?: ReactElement
  target?: string
}

export interface TProfileDropdownBodyItemsWithText extends TProfileDropdownBodyItems {
  text: string
  children?: never
}

export interface TProfileDropdownBodyItemsWithChildren extends TProfileDropdownBodyItems {
  text?: never
  children: ReactNode
}

type TNavItemValue = TProfileDropdownBodyItemsWithText | TProfileDropdownBodyItemsWithChildren

export type TProfileDropdownProps = {
  avatar: ReactElement
  email: string
  name: string
  bodyItems: TNavItemValue[]
  footerItems: TNavItemValue[]
  headerContent?: ReactNode
  className?: string
  userInfoAlignment?: 'left' | 'center'
}
