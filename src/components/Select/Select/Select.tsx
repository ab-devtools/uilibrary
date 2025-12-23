import type { JSX } from 'react'
import { Fragment } from 'react'
import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import {
  useOnOutsideClick,
  useGetElemPositions,
  useGetElemSizes,
  useGetHasBottomSpace,
  useGetHasTopSpace,
  useHideOnResize,
  useRecalculateDropdownPosition
} from '../../../hooks'
import { Input } from '../../Input'
import { Text } from '../../Text'
import { OptionItem } from '../../../helperComponents'
import { Loading } from '../SharedComponents'
import type { TSingleSelectPropTypes } from '../types'
import { useChangePositionsOnScroll } from '../../../hooks/useChangePositionsOnScroll'
import { IconCaretUpFilled } from '../../SVGIcons/IconCaretUpFilled'
import { IconCaretDownFilled } from '../../SVGIcons/IconCaretDownFilled'
import { noop } from '../../../utils/helpers'
import { DROPDOWN_AND_INPUT_GAP } from '../../../consts'

export const Select = (props: TSingleSelectPropTypes): JSX.Element | null => {
  const {
    className,
    size = 'large',
    name,
    value,
    label,
    avatar,
    options,
    hasError,
    isLoading,
    isValid,
    isSearchable = false,
    isDynamicSearchable = false,
    trimSearchValue = false,
    shouldRecalculateDropdownPosition = false,
    disabled,
    dataId = '',
    placeHolder,
    isCreateOnOutsideClick,
    selectedItem = null,
    setFieldValue,
    setSelectedItem,
    onInputChange,
    onInputFormatting,
    outerHelperText,
    innerHelperText,
    isRequiredField,
    labelLeftIconProps,
    labelRightIconComponent,
    optionRightIconComponent,
    selectRightIconProps = {
      Component: IconCaretDownFilled,
      size: 'xsmall'
    },
    selectRightIconOpenedProps = {
      Component: IconCaretUpFilled,
      size: 'xsmall'
    },
    labelAddons,
    tooltipAddons,
    renderOptions,
    isAllowed,
    defaultValue
  } = props

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null)

  const isDynamicSearchEnabled = useMemo(() => {
    if (isOpen && isDynamicSearchable) {
      const scrollHeight = scrollRef.current?.scrollHeight || 0
      const optionsContentHeight = dropdownRef?.offsetHeight || 0

      return scrollHeight > optionsContentHeight
    }

    return false
  }, [isOpen, scrollRef, dropdownRef])
  const currentSelection = (value as TItemValue) || selectedItem
  const [selectedOption, setSelectedOption] = useState<TSelectOption | null>(null)

  const isWithSearch = isSearchable || isDynamicSearchEnabled || isCreateOnOutsideClick

  const getFormatedValue = (value: string) => {
    if (onInputFormatting && value) {
      return onInputFormatting(value)
    }
    return value
  }

  const getSelectedOption = () => {
    return options.find((item) => item.value === currentSelection) as TSelectOption
  }

  const setCurrentSelectedLabel = useCallback(() => {
    const selectedItem = getSelectedOption()
    setSelectedOption({ ...selectedItem, label: getFormatedValue(selectedItem?.label as string) })
  }, [currentSelection, options])

  const leftIconProps = selectedOption?.optionLeftIcon?.Component
    ? {
        Component: selectedOption?.optionLeftIcon?.Component
      }
    : null

  useEffect(() => {
    setCurrentSelectedLabel()
  }, [setCurrentSelectedLabel])

  const openDropdown = () => setIsOpen(true)
  const closeDropdown = () => {
    setIsOpen(false)
    if (!isCreateOnOutsideClick) {
      setSearchValue('')
      setCurrentSelectedLabel()
    }
  }

  const handleOutsideClick = () => {
    const selected = getSelectedOption()
    if (!searchValue && selected && !isCreateOnOutsideClick) {
      setCurrentSelectedLabel()
    } else if (isCreateOnOutsideClick) {
      setSelectedOption({ label: searchValue, value: searchValue })
      onItemSelect(searchValue)
    }
    closeDropdown()
  }

  useOnOutsideClick([inputRef.current, dropdownRef], handleOutsideClick, isOpen, useId())
  useRecalculateDropdownPosition({
    shouldRecalculateDropdownPosition,
    isOpen,
    inputRef,
    dropdownRef
  })

  const { bottom, left, top } = useGetElemPositions(inputRef.current)
  const { width } = useGetElemSizes(containerRef.current)

  const filteredData = useMemo(() => {
    if (!searchValue) {
      return options
    }

    const processedSearchValue = trimSearchValue
      ? searchValue.trim().toLowerCase()
      : searchValue.toLowerCase()

    return options.filter((dataItem) => {
      return (
        typeof dataItem.label === 'string' &&
        dataItem.label.toLowerCase().includes(processedSearchValue)
      )
    })
  }, [searchValue, options])

  const onItemSelect = (value: TItemValue) => {
    if (setSelectedItem) {
      setSelectedItem(value)
    }
    if (name && setFieldValue) {
      setFieldValue(name, value)
    }

    closeDropdown()
  }

  const isInOptions = (value: string) => {
    return options.some((item) => `${item.value}` === value)
  }

  const onItemDeselect = () => onItemSelect(null)

  const onOpenOptions = (e: TClickEventType): void => {
    const selected = getSelectedOption()
    if (selected?.label && isCreateOnOutsideClick) {
      setSearchValue(`${selected.label}`)
    }

    const result = e?.target as HTMLDivElement
    const className = result?.getAttribute('class')
    if (
      e &&
      className &&
      (className.indexOf('icon-') !== -1 || className.indexOf('svg-icon') !== -1)
    ) {
      setIsOpen(!isOpen)
      e.preventDefault()
      return
    } else if (isOpen && !isWithSearch) {
      closeDropdown()
    } else {
      openDropdown()
    }
  }

  const clickHandler =
    (isSelected: boolean) =>
    ({ value }: TSelectedValue) => {
      setSearchValue('')
      if (!isSelected) {
        onItemSelect(value)
        return
      }
      if (!isRequiredField) {
        onItemDeselect()
      }
    }

  const onSearch = (e: TChangeEventType) => {
    setSelectedOption(null)
    setSearchValue(getFormatedValue(e.target.value))
  }
  const { hasBottomSpace } = useGetHasBottomSpace({
    element: dropdownRef,
    input: inputRef.current
  })

  const hasTopSpace = useGetHasTopSpace({
    element: dropdownRef,
    input: inputRef.current
  })

  useChangePositionsOnScroll({
    parentElement: inputRef?.current,
    childElement: dropdownRef,
    hasBottomSpace
  })

  useHideOnResize(closeDropdown)

  const rightIconOpenedProps = useMemo(() => {
    return {
      className: 'cursor-pointer pointer-events-unset',
      onClick: () => setIsOpen(false),
      ...selectRightIconOpenedProps
    }
  }, [selectRightIconOpenedProps])

  const rightIconProps = useMemo(() => {
    return {
      className: 'cursor-pointer pointer-events-unset',
      onClick: () => setIsOpen(true),
      ...selectRightIconProps
    }
  }, [selectRightIconProps])

  useEffect(() => {
    if (defaultValue && isCreateOnOutsideClick && !isInOptions(defaultValue)) {
      setSelectedOption({ label: defaultValue, value: defaultValue })
      setSearchValue(defaultValue)
      onItemSelect(defaultValue)
    }
  }, [defaultValue, isCreateOnOutsideClick])

  return (
    <div
      data-id={`${dataId}-content`}
      className={classNames(`select select--${size}`, className, {
        'select--opened': isOpen
      })}
      ref={containerRef}
    >
      <Input
        onClick={disabled ? noop : onOpenOptions}
        size={size === 'large' ? 'large' : 'small'}
        dataId={dataId}
        hasError={hasError}
        className="select__input"
        label={label}
        onChange={onSearch}
        onInput={onInputChange}
        required={isRequiredField}
        leftIconProps={leftIconProps}
        rightIconProps={isOpen ? rightIconOpenedProps : rightIconProps}
        readonly={!searchValue && !isWithSearch}
        placeholder={placeHolder}
        value={searchValue || selectedOption?.label || ''}
        isValid={isValid}
        disabled={disabled}
        helperText={outerHelperText}
        ref={inputRef}
        isAllowed={isAllowed}
        labelAddons={labelAddons}
        autoComplete="false"
      />

      {isOpen && (
        <div
          className="select__options"
          style={{
            left,
            width,
            ...(hasBottomSpace
              ? {
                top: bottom,
                maxHeight: top - DROPDOWN_AND_INPUT_GAP,
            } : {
                bottom: window.innerHeight - top + DROPDOWN_AND_INPUT_GAP,
                maxHeight: window.innerHeight - bottom - DROPDOWN_AND_INPUT_GAP,
            })
          }}
          ref={setDropdownRef}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <div
              data-id={`${dataId}-options-content`}
              ref={scrollRef}
              className={classNames('select__options__scroll', 'scrollbar', 'scrollbar--vertical', {
                'mr-6': (scrollRef.current?.scrollHeight || 0) > 300
              })}
            >
              {innerHelperText ? (
                <div className="content-top">
                  <Text size="xsmall" type="secondary" className="content-top__label">
                    {innerHelperText}
                  </Text>
                </div>
              ) : null}

              {filteredData.map((item: TSelectOption, i: number) => {
                const isSelected = item.value === currentSelection
                return (
                  <Fragment key={item.value}>
                    {renderOptions ? (
                      renderOptions({
                        onClick: clickHandler(isSelected),
                        data: item,
                        index: i,
                        disabled: item.disabled,
                        isSelected: isSelected
                      })
                    ) : (
                      <OptionItem
                        tooltipAddons={tooltipAddons}
                        data={item}
                        onClick={clickHandler(isSelected)}
                        optionLeftIcon={item?.optionLeftIcon}
                        labelLeftIconProps={labelLeftIconProps}
                        OptionRightIconComponent={optionRightIconComponent}
                        LabelRightIconComponent={labelRightIconComponent}
                        avatar={avatar}
                        disabled={item.disabled}
                        isSelected={isSelected}
                      />
                    )}
                  </Fragment>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
