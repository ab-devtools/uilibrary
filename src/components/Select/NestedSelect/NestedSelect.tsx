import type { JSX } from 'react'
import React, { useCallback, useId, useRef, useState } from 'react'
import { Input } from '../../Input'
import { OptionItem } from '../../../helperComponents'
import { useGetElemPositions, useGetElemSizes, useOnOutsideClick } from '../../../hooks'
import type { TNestedSelectProps } from '../types'
import IconCaretUpFilled from '../../SVGIcons/IconCaretUpFilled'
import IconCaretDownFilled from '../../SVGIcons/IconCaretDownFilled'
import type { TClickEventType, TItemValue, TSelectOption } from '../../../types/globalTypes'

const LEVEL_LEFT_MARGIN = 10

export const NestedSelect = (props: TNestedSelectProps): JSX.Element | null => {
  const {
    label,
    avatar,
    options,
    selected,
    placeHolder,
    isRequiredField,
    setSelectedValue,
    initialSelectedFolderIds,
    optionRightIconComponent,
    labelRightIconComponent,
    labelAddons
  } = props

  const [isDropdownOpen, setIsOpen] = useState(false)
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)
  const [selectedValues, setSelectedValues] = useState<TItemValue[]>(initialSelectedFolderIds || [])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { bottom, left } = useGetElemPositions(inputRef.current)
  const { width } = useGetElemSizes(containerRef)
  const openDropdown = () => setIsOpen(true)
  const closeDropdown = () => setIsOpen(false)

  const toggleDropdown = (e?: TClickEventType) => {
    const clickedElement = e?.target as HTMLDivElement
    if (e && clickedElement.className && clickedElement.className.indexOf('icon-') !== -1) {
      setIsOpen(!isDropdownOpen)
      e.preventDefault()
    } else {
      openDropdown()
    }
  }

  useOnOutsideClick(containerRef, closeDropdown, isDropdownOpen, useId())

  const onSelect = useCallback(
    (option: TSelectOption, hasChildren: boolean) => {
      const { value: optionValue } = option

      if (!hasChildren) {
        setSelectedValue(optionValue === selected?.value ? null : option)
        return
      }

      const isSelected = selectedValues.findIndex((i) => i === optionValue) !== -1
      if (isSelected) {
        setSelectedValues(selectedValues.filter((i) => i !== optionValue))
      } else {
        setSelectedValues([...selectedValues, optionValue])
      }
    },
    [selected, selectedValues]
  )

  const generateFolders = (foldersArr: TSelectOption[], level: number): Array<JSX.Element> =>
    foldersArr.reduce((acc: Array<JSX.Element>, option: TSelectOption) => {
      const { value, children, disabled } = option
      const isOpen = selectedValues.indexOf(option.value) !== -1
      const isSelected = option.value === selected?.value

      acc.push(
        <div style={{ paddingLeft: LEVEL_LEFT_MARGIN * level }}>
          <OptionItem
            data={option}
            key={value}
            isSelected={isSelected}
            onClick={() => onSelect({ value, label: option.label }, !!children)}
            avatar={avatar}
            disabled={disabled}
            OptionRightIconComponent={optionRightIconComponent}
            LabelRightIconComponent={labelRightIconComponent}
            labelLeftIconProps={
              children ? { Component: IconCaretDownFilled, size: 'xxsmall' } : undefined
            }
          />
        </div>
      )

      if (isOpen && children) {
        acc.push(...generateFolders(children, level + 1))
      }
      return acc
    }, [])

  return (
    <div className="select select--multi" ref={setContainerRef}>
      <div onClick={toggleDropdown}>
        <Input
          ref={inputRef}
          className="select__input"
          label={label}
          required={isRequiredField}
          rightIconProps={{
            Component: isDropdownOpen ? IconCaretUpFilled : IconCaretDownFilled,
            size: 'xsmall'
          }}
          placeholder={placeHolder}
          currentValue={selected?.label.toString() || ''}
          readonly={true}
          labelAddons={labelAddons}
        />
      </div>

      {isDropdownOpen && (
        <div className="select__options" style={{ left, width, top: bottom }}>
          <div className="select__options__scroll scrollbar scrollbar--vertical">
            {generateFolders(options, 0)}
          </div>
        </div>
      )}
    </div>
  )
}
