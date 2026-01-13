import type { JSX } from 'react'
import React, { useCallback, useMemo, useState } from 'react'
import { Divider } from '../../../Divider'
import { Empty } from '../../../Empty'
import { useGetElemSizes } from '../../../../hooks'
import { OptionItem } from '../../../../helperComponents'
import { ContentTop } from '../../SharedComponents'
import type { TMultySingleTabPropTypes } from '../../types'
import { DROPDOWN_MAX_HEIGHT } from '../../constants'
import type { TItemValue, TSelectedValue, TSelectOption } from '../../../../types/globalTypes'

export const MultiBase = (props: TMultySingleTabPropTypes): JSX.Element | null => {
  const {
    avatar,
    scrollableContentStyle,
    options,
    helperText,
    translations,
    onItemSelect,
    onItemDeselect,
    isSearchAvailable,
    setSelectedValues,
    selectedValues,
    labelLeftIconProps,
    labelRightIconComponent,
    optionRightIconComponent,
    maxSelectCount,
    menuOptions,
    dataIdPrefix
  } = props

  const { emptyListMainMessage, emptyListSecondaryMessage } = translations

  const [contentContainerRef, setContentContainerRef] = useState<HTMLDivElement | null>(null)

  const [searchValue, setSearchValue] = useState('')
  const [isAllSelected, setAllSelected] = useState(false)

  const { scrollHeight } = useGetElemSizes(contentContainerRef)

  const clearAll = useCallback(() => {
    setAllSelected(false)
    setSelectedValues([])
  }, [])

  const filteredData = useMemo(() => {
    if (!searchValue) {
      return options
    }

    return options.filter((dataItem) => {
      return (
        typeof dataItem.label === 'string' &&
        dataItem.label.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      )
    })
  }, [searchValue, options])

  const selectAll = useCallback(() => {
    setAllSelected(true)
    const allValues = filteredData.map((item: TSelectOption) => {
      const { value, label } = item
      return { value, label }
    })

    setSelectedValues(allValues)
  }, [filteredData])

  const onDeselect = (item: TSelectedValue) => {
    setAllSelected(false)
    onItemDeselect(item)
  }

  const checkIsSelected = (itemValue: TItemValue) => {
    return selectedValues.find((item) => item.value === itemValue) !== undefined
  }

  const selectedOptions = useMemo(
    () =>
      options.filter(
        (item: TSelectOption) => selectedValues.findIndex((s) => s.value === item.value) !== -1
      ),
    [options, selectedValues]
  )

  const optionProps = useMemo(() => {
    return {
      avatar,
      isCheckbox: true,
      labelLeftIconProps,
      optionRightIconComponent,
      labelRightIconComponent
    }
  }, [avatar, labelLeftIconProps, optionRightIconComponent, labelRightIconComponent])

  return (
    <>
      <ContentTop
        dataIdPrefix={dataIdPrefix}
        menuOptions={menuOptions}
        selectAll={selectAll}
        clearAll={clearAll}
        hasLimitation={!!maxSelectCount}
        isAnySelected={selectedValues.length !== 0}
        helperText={helperText}
        isSearchAvailable={isSearchAvailable}
        isSelectAllDisabled={isAllSelected || filteredData.length === 0}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        translations={translations}
      />

      <div
        ref={setContentContainerRef}
        className={`select__options__scroll scrollbar scrollbar--vertical ${
          scrollHeight > DROPDOWN_MAX_HEIGHT ? 'mr-6' : ''
        }`}
        style={scrollableContentStyle}
      >
        {isSearchAvailable && (
          <div className="selected-items">
            {selectedOptions.map((item: TSelectOption) => {
              const isSelected = selectedValues.findIndex((s) => s.value === item.value) !== -1

              return (
                <OptionItem
                  data={item}
                  key={item.value}
                  isSelected
                  disabled={item.disabled}
                  onClick={isSelected ? onDeselect : onItemSelect}
                  {...optionProps}
                />
              )
            })}
          </div>
        )}

        <Divider type="primary" isHorizontal />
        {filteredData.map((item: TSelectOption, index) => {
          const isSelected = checkIsSelected(item.value)
          return (
            <OptionItem
              data={item}
              dataId={item.dataId}
              key={`${item.value}_${index}`}
              onClick={isSelected ? onDeselect : onItemSelect}
              disabled={item.disabled || (!isSelected && selectedValues.length === maxSelectCount)}
              isSelected={isSelected}
              {...optionProps}
            />
          )
        })}
      </div>
      {filteredData.length === 0 ? (
        <Empty
          size="small"
          mainMessage={emptyListMainMessage}
          paragraphMessage={emptyListSecondaryMessage}
        />
      ) : null}
    </>
  )
}
