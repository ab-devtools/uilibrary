import type { ReactElement } from 'react'
import React, { useEffect, useId, useMemo, useRef, useState } from 'react'

import { OptionsWrapper } from './OptionsWrapper'
import { Footer, InputSelectWrapper, ButtonSelectWrapper } from '../SharedComponents'
import { useOnOutsideClick } from '../../../hooks'
import { TRANSLATIONS_DEFAULT_VALUES } from '../constants'
import type { TMultiSelectPropTypes } from '../types'
import type { TSelectedValue } from '../../../types/globalTypes'

export const MultiSelect = (props: TMultiSelectPropTypes): ReactElement => {
  const {
    options,
    footerButtonProps = {
      confirm: {
        buttonText: 'Apply'
      },
      cancel: { buttonText: 'Cancel' }
    },
    selectedItems,
    setSelectedItems,
    name,
    setFieldValue,
    value,
    label,
    placeHolder,
    isRequiredField,
    labelAddons,
    className = '',
    disabled,
    dropdownWidth,
    align = 'left',
    size,
    isButtonSelect,
    checkboxInfo,
    translations,
    hasError,
    autoApplyOnClose = false,
    autoApplyOnChooseItem = false,
    dataId,
    ...rest
  } = props

  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null)

  const initialSelected = (value as TSelectedValue[]) || selectedItems || []

  const [isOpen, setIsOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<TSelectedValue[]>(initialSelected)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const hasOpenedRef = useRef(false)

  const closeDropdown = () => setIsOpen(false)
  const openDropdown = () => setIsOpen(true)

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const hasChange = useMemo(() => {
    const initial = (initialSelected || []).map((i) => i.value).sort()
    const current = (selectedValues || []).map((i) => i.value).sort()

    if (initial.length !== current.length) return true

    return initial.some((val, index) => val !== current[index])
  }, [initialSelected, selectedValues])

  useEffect(() => {
    if (autoApplyOnChooseItem) {
      submitSelectedValue(selectedValues, false, false)
    }
  }, [selectedValues, autoApplyOnChooseItem])

  useEffect(() => {
    if (isOpen) {
      hasOpenedRef.current = true
    }

    if (!isOpen && autoApplyOnClose && hasOpenedRef.current && hasChange) {
      submitSelectedValue(selectedValues, false)
    }
  }, [isOpen, autoApplyOnClose, hasChange])

  useEffect(() => {
    setSelectedValues((value as TSelectedValue[]) || [])
  }, [value])

  useEffect(() => {
    if (selectedItems) {
      setSelectedValues(selectedItems || [])
    }
  }, [selectedItems])

  const cancelSelectedItems = () => {
    setSelectedValues(initialSelected)
    closeDropdown()
  }

  useOnOutsideClick(
    containerRef.current,
    autoApplyOnClose ? closeDropdown : cancelSelectedItems,
    isOpen,
    useId()
  )

  const submitSelectedValue = (
    selections: TSelectedValue[],
    isChecked: boolean,
    closeDropdownOnApply = true
  ) => {
    if (setSelectedItems) {
      setSelectedItems(selections, isChecked)
    }
    if (name && setFieldValue) {
      setFieldValue(name, selections)
    }

    if (closeDropdownOnApply) {
      closeDropdown()
    }
  }

  const applySelectedItems = (isChecked: boolean) => {
    submitSelectedValue(selectedValues, isChecked)
  }

  const WrapperComponent = isButtonSelect ? ButtonSelectWrapper : InputSelectWrapper

  const localizations = { ...TRANSLATIONS_DEFAULT_VALUES, ...translations }

  const { overflowText } = localizations
  return (
    <WrapperComponent
      dropdownRef={dropdownRef}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      toggleDropdown={toggleDropdown}
      containerRef={containerRef?.current}
      setContainerRef={containerRef}
      dropdownWidth={dropdownWidth}
      setDropdownRef={setDropdownRef}
      size={size}
      label={label}
      align={align}
      disabled={disabled}
      className={className}
      labelAddons={labelAddons}
      placeHolder={placeHolder}
      selectedValues={selectedValues}
      isRequiredField={isRequiredField}
      overflowText={overflowText}
      hasError={hasError}
      dataId={dataId}
    >
      <>
        <OptionsWrapper
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          options={options}
          isOpen={isOpen}
          translations={translations}
          setIsOpen={setIsOpen}
          dropdownRef={dropdownRef}
          openDropdown={openDropdown}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          containerRef={containerRef?.current}
          {...rest}
        />
        {!autoApplyOnClose && options.length ? (
          <Footer
            checkboxInfo={checkboxInfo}
            hasChange={hasChange}
            buttonProps={footerButtonProps}
            onCancel={cancelSelectedItems}
            onApply={applySelectedItems}
          />
        ) : null}
      </>
    </WrapperComponent>
  )
}
