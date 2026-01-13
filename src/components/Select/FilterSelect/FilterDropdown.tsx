import type { JSX } from 'react'
import React, { useMemo } from 'react'
import { OptionItem } from '../../../helperComponents'
import type { TFilterDropdownContentProps } from '../types'
import type { TSelectOption } from '../../../types/globalTypes'

export const FilterDropdownContent = (props: TFilterDropdownContentProps): JSX.Element => {
  const {
    checkIsSelected,
    filterValue,
    options,
    onItemSelect,
    onItemDeselect,
    labelLeftIconProps,
    optionRightIconComponent,
    labelRightIconComponent,
    avatar
  } = props

  const filteredOptions = useMemo(() => {
    return options.filter((option) => {
      return option.label.toString().includes(filterValue)
    })
  }, [filterValue, options])

  return (
    <>
      {filteredOptions.map((item: TSelectOption) => {
        const isSelected = checkIsSelected(item.value)

        return (
          <OptionItem
            data={item}
            key={item.value}
            onClick={isSelected ? onItemDeselect : onItemSelect}
            labelLeftIconProps={labelLeftIconProps}
            OptionRightIconComponent={optionRightIconComponent}
            LabelRightIconComponent={labelRightIconComponent}
            avatar={avatar}
            isCheckbox={true}
            disabled={item.disabled}
            isSelected={isSelected}
          />
        )
      })}
    </>
  )
}
