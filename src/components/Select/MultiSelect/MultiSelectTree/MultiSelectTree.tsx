import type { JSX } from 'react'
import React, { useMemo, useState } from 'react'
import { Text } from '../../../Text'
import { Empty } from '../../../Empty'
import { OptionItem } from '../../../../helperComponents'
import { ContentTop } from '../../SharedComponents'
import type { TMultiSelectTreeProps } from '../../types'
import IconCaretUpFilled from '../../../SVGIcons/IconCaretUpFilled'
import IconCaretDownFilled from '../../../SVGIcons/IconCaretDownFilled'
import { Checkbox } from '../../../Checkbox'
import type {
  TSelectedValue,
  TSelectGroupOption,
  TSelectGroupOptions,
  TSelectOption,
  TSelectTreeOptions
} from '../../../../types/globalTypes'

export const MultiSelectTree = (props: TMultiSelectTreeProps): JSX.Element | null => {
  const {
    avatar,
    options,
    helperText,
    translations,
    selectedValues,
    onItemSelect,
    onItemDeselect,
    setSelectedValues,
    isSearchAvailable,
    labelLeftIconProps,
    scrollableContentStyle,
    optionRightIconComponent,
    labelRightIconComponent,
    maxSelectCount,
    menuOptions,
    dataIdPrefix
  } = props

  const { emptyListMainMessage, emptyListSecondaryMessage } = translations

  const [searchValue, setSearchValue] = useState('')
  const [openGroups, setOpenGroups] = useState<Record<number, boolean>>({ 0: true })
  const [isAllSelected, setAllSelected] = useState(false)

  const filteredData: TSelectTreeOptions = useMemo(() => {
    if (!searchValue) {
      return options
    }

    return options.reduce(
      (acc: TSelectGroupOptions, group: TSelectGroupOption): TSelectGroupOptions => {
        const { data, title } = group
        const groupData = data.filter((dataItem) => {
          return (
            typeof dataItem.label === 'string' &&
            dataItem.label.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
          )
        })

        if (groupData.length) {
          return [
            ...acc,
            {
              title,
              data: groupData
            }
          ]
        }
        return acc
      },
      []
    )
  }, [searchValue, options])

  const onDeselect = (item: TSelectedValue) => {
    setAllSelected(false)
    onItemDeselect(item)
  }

  const onGroupClick = (index: number) => {
    setOpenGroups((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const optionProps = useMemo(() => {
    return {
      isCheckbox: true,
      avatar,
      labelLeftIconProps,
      optionRightIconComponent,
      labelRightIconComponent,
      className: 'group-item__option'
    }
  }, [avatar, labelLeftIconProps, optionRightIconComponent, labelRightIconComponent])
  const hasTopContent = isSearchAvailable || helperText

  return (
    <>
      {hasTopContent ? (
        <ContentTop
          dataIdPrefix={dataIdPrefix}
          menuOptions={menuOptions}
          isSearchAvailable={isSearchAvailable}
          hasLimitation={!!maxSelectCount}
          isAnySelected={selectedValues.length !== 0}
          helperText={helperText}
          isSelectAllDisabled={isAllSelected || filteredData.length === 0}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          translations={translations}
        />
      ) : null}
      <div
        className={'select__options__scroll scrollbar scrollbar--vertical'}
        style={scrollableContentStyle}
      >
        <div>
          {filteredData.map(({ title, data }: TSelectGroupOption, index: number) => {
            const isActive = !!openGroups[index]

            const groupHasSelected = data.some((item) =>
              selectedValues.find((s) => s.value === item.value)
            )

            const handleGroupCheckboxChange = (checked: boolean) => {
              const groupValues = data
                .filter((item) => !item.disabled)
                .map((item) => ({ value: item.value, label: item.label, parentId: item.parentId }))

              if (checked) {
                const newSelected = [...selectedValues]
                groupValues.forEach((item) => {
                  if (!newSelected.find((s) => s.value === item.value)) {
                    newSelected.push(item)
                  }
                })
                setSelectedValues(newSelected)
              } else {
                const newSelected = selectedValues.filter(
                  (s) => !data.find((item) => item.value === s.value)
                )
                setSelectedValues(newSelected)
              }
            }

            return (
              <div className="select__group group-item" key={`${data[0]?.value}_${index}`}>
                <div onClick={() => onGroupClick(index)} className="group-item__top">
                  <Checkbox
                    className="mr-8"
                    onClick={(checked) => {
                      handleGroupCheckboxChange(checked)
                    }}
                    selectedValue={groupHasSelected}
                  />
                  <Text className="group-item__title pr-4">{title}</Text>
                  {isActive ? (
                    <IconCaretUpFilled size="xxsmall" className="group-item__icon" />
                  ) : (
                    <IconCaretDownFilled size="xxsmall" className="group-item__icon" />
                  )}
                </div>
                {isActive ? (
                  <div className="group-item__content">
                    {data.map((item: TSelectOption) => {
                      const isSelected =
                        selectedValues.findIndex((s) => s.value === item.value) !== -1
                      return (
                        <OptionItem
                          data={item}
                          dataId={item.dataId}
                          key={item.value}
                          isSelected={isSelected}
                          disabled={
                            item.disabled ||
                            (!isSelected && selectedValues.length === maxSelectCount)
                          }
                          onClick={isSelected ? () => onDeselect(item) : () => onItemSelect(item)}
                          {...optionProps}
                        />
                      )
                    })}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
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
