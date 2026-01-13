import type { JSX } from 'react'
import React, { useCallback, useMemo, useState } from 'react'
import { Text } from '../../../Text'
import { Empty } from '../../../Empty'
import { OptionItem } from '../../../../helperComponents'
import type { TMultiSelectGroupedProps } from '../../types'
import IconCaretUpFilled from '../../../SVGIcons/IconCaretUpFilled'
import IconCaretDownFilled from '../../../SVGIcons/IconCaretDownFilled'
import type { TSelectedValue } from '../../../../types/globalTypes'

export const RadioSelectGrouped = ({
  avatar,
  options,
  translations,
  selectedValues,
  setSelectedValues,
  labelLeftIconProps,
  scrollableContentStyle,
  optionRightIconComponent,
  labelRightIconComponent,
  maxSelectCount
}: TMultiSelectGroupedProps): JSX.Element | null => {
  const { emptyListMainMessage, emptyListSecondaryMessage } = translations

  const [openGroups, setOpenGroups] = useState<Record<number, boolean>>({ 0: true })

  const filteredData = useMemo(() => options, [options])

  const onGroupClick = (index: number) => {
    setOpenGroups((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const optionProps = useMemo(
    () => ({
      isRadio: true,
      avatar,
      labelLeftIconProps,
      optionRightIconComponent,
      labelRightIconComponent,
      className: 'group-item__option'
    }),
    [avatar, labelLeftIconProps, optionRightIconComponent, labelRightIconComponent]
  )

  const onRadioItemSelect = useCallback(
    (item: TSelectedValue, groupIndex: number) => {
      const groupData = filteredData[groupIndex]?.data || []

      const parentItem = groupData.find((g) => g.value === item.value)
      const parentId = parentItem?.parentId || null

      const filteredSelected = selectedValues.filter(
        (selectedItem) => !groupData.some((groupItem) => groupItem.value === selectedItem.value)
      )

      const newSelected = [
        ...filteredSelected,
        {
          ...item,
          parentId
        }
      ]

      setSelectedValues(newSelected)
    },
    [filteredData, selectedValues, setSelectedValues]
  )

  return (
    <>
      <div
        className={'select__options__scroll scrollbar scrollbar--vertical'}
        style={scrollableContentStyle}
      >
        <div>
          {filteredData.map(({ title, data }, index) => {
            const isActive = !!openGroups[index]

            return (
              <div className="select__group group-item" key={`${data[0]?.value}_${index}`}>
                <div onClick={() => onGroupClick(index)} className="group-item__top">
                  <Text size="xxsmall" type="tertiary" className="group-item__title pr-4">
                    {title}
                  </Text>
                  {isActive ? (
                    <IconCaretUpFilled size="xxsmall" className="group-item__icon" />
                  ) : (
                    <IconCaretDownFilled size="xxsmall" className="group-item__icon" />
                  )}
                </div>
                {isActive &&
                  data.map((item) => {
                    const isSelected = selectedValues.some((s) => s.value === item.value)
                    return (
                      <OptionItem
                        data={item}
                        dataId={item.dataId}
                        key={item.value}
                        isSelected={isSelected}
                        disabled={
                          item.disabled || (!isSelected && selectedValues.length === maxSelectCount)
                        }
                        onClick={() => onRadioItemSelect(item, index)}
                        {...optionProps}
                      />
                    )
                  })}
              </div>
            )
          })}
        </div>
      </div>
      {filteredData.length === 0 && (
        <Empty
          size="small"
          mainMessage={emptyListMainMessage}
          paragraphMessage={emptyListSecondaryMessage}
        />
      )}
    </>
  )
}
