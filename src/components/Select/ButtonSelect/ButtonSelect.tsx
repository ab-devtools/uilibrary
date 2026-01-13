import type { ReactElement } from 'react'
import React, { useRef, useId, useState } from 'react'
import classNames from 'classnames'
import { OptionItem } from '../../../helperComponents'
import { useGetElemSizes, useOnOutsideClick } from '../../../hooks'
import { Loading, ButtonSelectWrapper } from '../SharedComponents'
import type { TButtonSelectPropTypes } from '../types'
import type { TItemValue, TSelectedValue, TSelectOption } from '../../../types/globalTypes'

export const ButtonSelect = (props: TButtonSelectPropTypes): ReactElement => {
  const {
    size,
    className,
    isLoading,
    options,
    name,
    setSelectedItem,
    setFieldValue,
    isRequiredField,
    selectedItem,
    labelLeftIconProps,
    tooltipAddons,
    dropdownWidth,
    avatar,
    labelRightIconComponent,
    optionRightIconComponent,
    align = 'left',
    value,
    placeHolder,
    offsets,
    dataId,
    disabled,
    type
  } = props

  const currentSelection = (value as TItemValue) || selectedItem

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null)

  const { scrollHeight } = useGetElemSizes(scrollRef.current)

  const closeDropdown = () => setIsOpen(false)

  useOnOutsideClick(containerRef.current, closeDropdown, isOpen, useId())

  const onItemDeselect = () => onItemSelect(null)

  const onItemSelect = (value: TItemValue) => {
    if (setSelectedItem) {
      setSelectedItem(value)
    }
    if (name && setFieldValue) {
      setFieldValue(name, value)
    }

    closeDropdown()
  }

  const clickHandler =
    (isSelected: boolean) =>
    ({ value }: TSelectedValue) => {
      if (!isSelected) {
        onItemSelect(value)
        return
      }
      if (!isRequiredField) {
        onItemDeselect()
      }
    }

  return (
    <ButtonSelectWrapper
      size={size}
      className={className}
      dropdownWidth={dropdownWidth}
      align={align}
      offsets={offsets}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      containerRef={containerRef.current}
      setContainerRef={containerRef}
      dropdownRef={dropdownRef}
      setDropdownRef={setDropdownRef}
      placeHolder={placeHolder}
      disabled={disabled}
      dataId={dataId}
      type={type}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            ref={scrollRef}
            className={classNames('select__options__scroll', 'scrollbar', 'scrollbar--vertical', {
              'mr-6': scrollHeight > 300
            })}
          >
            {options.map((item: TSelectOption) => {
              const isSelected = item.value === currentSelection
              return (
                <OptionItem
                  tooltipAddons={tooltipAddons}
                  data={item}
                  key={item.value}
                  onClick={clickHandler(isSelected)}
                  labelLeftIconProps={labelLeftIconProps}
                  OptionRightIconComponent={optionRightIconComponent}
                  LabelRightIconComponent={labelRightIconComponent}
                  avatar={avatar}
                  disabled={item.disabled}
                  isSelected={isSelected}
                />
              )
            })}
          </div>
        </>
      )}
    </ButtonSelectWrapper>
  )
}
