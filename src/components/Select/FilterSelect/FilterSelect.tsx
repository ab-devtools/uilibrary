import type { ReactElement } from 'react'
import React, { useCallback, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { useOnOutsideClick, useHideOnScroll } from '../../../hooks'
import { FilterDropdownContent } from './FilterDropdown'
import { FilterGroupDropdownContent } from './FilterGroupDropdown'
import { Footer, Loading } from '../SharedComponents'
import { Input } from '../../Input'
import type { TFilterProps } from '../types'
import IconSearchFilled from '../../SVGIcons/IconSearchFilled'
import IconDismissFilled from '../../SVGIcons/IconDismissFilled'
import type {
  TChangeEventType,
  TItemValue,
  TSelectedValue,
  TSelectGroupOptions,
  TSelectOptions
} from '../../../types/globalTypes'

export const FilterSelect = (props: TFilterProps): ReactElement | null => {
  const {
    isLoading,
    isGrouped,
    options,
    isOpen,
    setFieldValue,
    name,
    footerButtonProps = {
      confirm: {
        buttonText: 'Apply'
      },
      cancel: { buttonText: 'Cancel' }
    },
    selectedItems,
    setSelectedItems,
    closeHandler,
    parentRef,
    ...rest
  } = props

  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)
  const [selectedValues, setSelectedValues] = useState<TSelectedValue[]>(selectedItems)
  const [filterValue, setFilterValue] = useState('')

  useOnOutsideClick(containerRef, closeHandler, isOpen, useId())
  useHideOnScroll(closeHandler)

  const onItemSelect = useCallback((item: TSelectedValue) => {
    setSelectedValues((selected) => [...selected, item])
  }, [])

  const submitSelectedValue = (selections: TSelectedValue[]) => {
    if (setSelectedItems) {
      setSelectedItems(selections)
    }
    if (name && setFieldValue) {
      setFieldValue(name, selections)
    }

    closeHandler()
  }

  const checkIsSelected = (itemValue: TItemValue) => {
    return selectedValues.find((item) => item.value === itemValue) !== undefined
  }

  const applySelectedItems = useCallback(() => {
    submitSelectedValue(selectedValues)
    closeHandler()
  }, [selectedValues])

  const cancelSelectedItems = () => {
    submitSelectedValue(selectedItems)
    setSelectedValues(selectedItems)
    closeHandler()
  }

  const onItemDeselect = ({ value }: TSelectedValue) => {
    setSelectedValues((selected) =>
      selected.filter((optionValue: TSelectedValue) => optionValue.value !== value)
    )
  }

  const onFilter = (e: TChangeEventType) => {
    e.preventDefault()
    e.stopPropagation()
    setFilterValue(e.target.value)
  }

  const removeFilterValue = () => {
    setFilterValue('')
  }

  if (!isOpen) {
    return null
  }

  return createPortal(
    <div className="select filter">
      <div className="select__options" ref={setContainerRef}>
        <Input
          onChange={onFilter}
          className="filter__input"
          size="small"
          currentValue={filterValue}
          rightIconProps={{
            size: filterValue === '' ? 'small' : 'xsmall',
            Component: filterValue === '' ? IconSearchFilled : IconDismissFilled,
            onClick: removeFilterValue
          }}
        />
        <div className={'select__options__scroll scrollbar scrollbar--vertical '}>
          {isLoading ? (
            <Loading />
          ) : isGrouped ? (
            <FilterGroupDropdownContent
              checkIsSelected={checkIsSelected}
              onItemDeselect={onItemDeselect}
              filterValue={filterValue}
              onItemSelect={onItemSelect}
              options={options as TSelectGroupOptions}
              {...rest}
            />
          ) : (
            <FilterDropdownContent
              checkIsSelected={checkIsSelected}
              onItemDeselect={onItemDeselect}
              filterValue={filterValue}
              onItemSelect={onItemSelect}
              options={options as TSelectOptions}
              {...rest}
            />
          )}
        </div>
        {isLoading ? null : (
          <Footer
            buttonProps={footerButtonProps}
            onCancel={cancelSelectedItems}
            onApply={applySelectedItems}
          />
        )}
      </div>
    </div>,
    parentRef
  )
}
