import type { ReactElement } from 'react'
import React, { useCallback, useMemo, useRef } from 'react'
import { Loading } from '../SharedComponents'
import { MultiSelectGrouped } from './MultiSelectGrouped/MultiSelectGrouped'
import { MultiSelectTree } from './MultiSelectTree/MultiSelectTree'
import { MultiBase } from './MultiBase/MultiBase'
import { MultiSelectWithTabs } from './MultiSelectWithTabs/MultiSelectWithTabs'
import { RadioSelectGrouped } from './RadioSelectGrouped/RadioSelectGrouped'
import { getStringWidth } from '../../../utils/helpers'
import { SELECTED_VISIBLE_MIN_COUNT, TRANSLATIONS_DEFAULT_VALUES } from '../constants'
import { useGetElemSizes, useGetHasBottomSpace, useGetHasTopSpace } from '../../../hooks'
import type { TSelectTranslations } from '../types'
import type {
  TClickEventType,
  TSelectedValue,
  TSelectGroupOption,
  TSelectGroupOptions,
  TSelectOptions
} from '../../../types/globalTypes'

type TProps = {
  isLoading?: boolean
  withTabs?: boolean
  isGrouped?: boolean
  isMultiSelectTree?: boolean
  isRadioGrouped?: boolean
  isOpen: boolean
  translations: TSelectTranslations
  containerRef: HTMLDivElement | null
  setIsOpen: (isOpen: boolean) => void
  dropdownRef: HTMLDivElement | null
  options: TSelectOptions
  selectedValues: TSelectedValue[]
  setSelectedValues: (values: TSelectedValue[]) => void
}
export const OptionsWrapper = (props: TProps): ReactElement => {
  const {
    isLoading,
    withTabs,
    isGrouped,
    isMultiSelectTree,
    isRadioGrouped,
    isOpen,
    translations,
    containerRef,
    options,
    selectedValues,
    setSelectedValues,
    setIsOpen,
    dropdownRef,
    ...rest
  } = props
  const { width } = useGetElemSizes(containerRef)

  const localizations = { ...TRANSLATIONS_DEFAULT_VALUES, ...translations }

  const inputRef = useRef<HTMLInputElement | null>(null)

  const SelectComp = isMultiSelectTree
    ? MultiSelectTree
    : withTabs
    ? MultiSelectWithTabs
    : isRadioGrouped
    ? RadioSelectGrouped
    : isGrouped
    ? MultiSelectGrouped
    : MultiBase

  const checkIsValueOverflowed = useCallback(
    (value: string) => {
      const elemWidth = getStringWidth(value, 14)
      return elemWidth > width - 80 // padding and width of (+number)
    },
    [width]
  )

  const toggleDropdown = (e?: TClickEventType) => {
    const clickedElement = e?.target as HTMLDivElement
    const className = clickedElement?.getAttribute('class')
    if (
      e &&
      className &&
      (className.indexOf('icon-') !== -1 || className.indexOf('svg-icon') !== -1)
    ) {
      setIsOpen(!isOpen)
      e.preventDefault()
    } else {
      setIsOpen(true)
    }
  }

  const onItemSelect = (item: TSelectedValue) => {
    setSelectedValues([...selectedValues, item])
  }

  const onItemDeselect = (item: TSelectedValue) => {
    setSelectedValues(
      selectedValues.filter((optionValue: TSelectedValue) => optionValue.value !== item.value)
    )
  }

  const optionsCount = useMemo(() => {
    if (isGrouped || withTabs) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const typed_options = options as TSelectGroupOptions
      return typed_options.reduce((acc: number, option: TSelectGroupOption) => {
        const { data } = option
        return acc + data.length
      }, 0)
    }
    return options.length
  }, [options])

  const { hasBottomSpace, bottomSpace } = useGetHasBottomSpace({
    element: dropdownRef,
    input: inputRef.current
  })

  const hasTopSpace = useGetHasTopSpace({
    element: dropdownRef,
    input: inputRef.current
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <SelectComp
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      options={options}
      isOpen={isOpen}
      hasBottomSpace={hasBottomSpace}
      translations={localizations}
      selectedValues={selectedValues}
      onItemSelect={onItemSelect}
      onItemDeselect={onItemDeselect}
      toggleDropdown={toggleDropdown}
      setSelectedValues={setSelectedValues}
      checkIsValueOverflowed={checkIsValueOverflowed}
      isSearchAvailable={optionsCount > SELECTED_VISIBLE_MIN_COUNT}
      scrollableContentStyle={{
        ...(!hasBottomSpace && !hasTopSpace ? { maxHeight: bottomSpace - 65 - 56 } : {})
      }} // 65 - height of the top content, 56 - height of the footer
      isMultiSelectTree={isMultiSelectTree}
      {...rest}
    />
  )
}
