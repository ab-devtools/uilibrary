import React, { useState, useRef, useMemo, memo, useCallback } from 'react'
import { Chips } from '../Chips'
import type { TMultiTextareaWithChipsProps, ChipValue } from './types'
import { ErrorMessage } from '../../helperComponents'
import classNames from 'classnames'
import { useFormProps } from '../../hooks'
import {
  useChipManagement,
  useChipValidation,
  useDropdownLogic,
  useKeyboardNavigation,
  useOnBlurLogic
} from './hooks'

const MultiTextareaWithChipsComponent: React.FC<TMultiTextareaWithChipsProps> = ({
  label,
  placeholder,
  helperText,
  chips = [],
  onAddChip,
  onRemoveChip,
  className = '',
  disabled = false,
  availableOptions = [],
  allowCustomValues = true,
  allowDuplicates = false,
  searchPlaceholder,
  chipValidationSchema,
  chipValidationErrorMessage,
  allowInvalidChips = false,
  searchPlaceholderText = 'Search and select...',
  typeAndEnterPlaceholderText = 'Type and press Enter...',
  noOptionsPlaceholderText = 'No more options available',
  fieldName = 'skills',
  formProps,
  minChipLength,
  maxChipLength,
  onBlurConfig,
  transformToUppercase = false
}) => {
  const [inputValue, setInputValue] = useState('')
  const [chipError, setChipError] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { setValue } = useFormProps()

  const chipManagement = useChipManagement({
    initialChips: chips,
    fieldName,
    formProps,
    setValue,
    onAddChip,
    onRemoveChip
  })

  const chipValidation = useChipValidation({
    validationSchema: chipValidationSchema,
    errorMessage: chipValidationErrorMessage,
    allowInvalidChips,
    minChipLength,
    maxChipLength
  })

  const dropdownLogic = useDropdownLogic({
    availableOptions,
    chipTexts: chipManagement.getChipTexts(),
    containerRef
  })

  const handleSelectOption = (option: string) => {
    if (!allowDuplicates && chipManagement.getChipTexts().includes(option)) return

    try {
      const valueToValidate = transformToUppercase ? option.toUpperCase() : option
      const validatedChip = chipValidation.createValidatedChip(valueToValidate)
      chipManagement.addChip(validatedChip)
      setInputValue('')
      dropdownLogic.closeDropdown()
      setChipError('')
    } catch (error) {
      if (!allowInvalidChips) {
        setChipError(error instanceof Error ? error.message : 'Invalid value')
      }
    }
  }

  const handleAddCustomValue = useCallback(
    (value: string) => {
      if (!allowDuplicates && chipManagement.getChipTexts().includes(value)) return

      try {
        const valueToValidate = transformToUppercase ? value.toUpperCase() : value
        const validatedChip = chipValidation.createValidatedChip(valueToValidate)
        chipManagement.addChip(validatedChip)
        setInputValue('')
        setChipError('')
      } catch (error) {
        if (!allowInvalidChips) {
          setChipError(error instanceof Error ? error.message : 'Invalid value')
        }
      }
    },
    [chipManagement, chipValidation, allowInvalidChips, transformToUppercase, allowDuplicates]
  )

  const onBlurLogic = useOnBlurLogic({
    inputValue,
    disabled,
    allowCustomValues,
    availableOptions,
    minChipLength,
    maxChipLength,
    onBlurConfig,
    onAddCustomValue: handleAddCustomValue,
    chipValidationSchema,
    allowInvalidChips
  })

  const handleRemoveLastChip = () => {
    const lastChipIndex = chipManagement.chips.length - 1
    if (lastChipIndex >= 0) {
      chipManagement.removeChip(lastChipIndex)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return
    let value = e.target.value

    if (transformToUppercase) {
      value = value.toUpperCase()
    }

    setInputValue(value)
    dropdownLogic.handleInputChange(value)
  }

  const handleInputFocus = () => {
    dropdownLogic.handleInputFocus(inputValue)
  }

  const handleInputBlur = onBlurLogic.handleInputBlur

  const keyboardNavigation = useKeyboardNavigation({
    disabled,
    inputValue,
    allowCustomValues,
    chips: chipManagement.chips,
    filteredOptions: dropdownLogic.filteredOptions,
    selectedOption: dropdownLogic.selectedOption,
    onAddCustomValue: handleAddCustomValue,
    onNavigateOptions: dropdownLogic.navigateOptions,
    onSelectOption: (option) => {
      const selected = dropdownLogic.selectOption(option)
      if (selected) {
        handleSelectOption(selected)
      }
    },
    onCloseDropdown: dropdownLogic.closeDropdown,
    onRemoveLastChip: handleRemoveLastChip,
    inputRef
  })

  const inputPlaceholder = useMemo(() => {
    if (chipManagement.chips.length === 0) return placeholder
    if (availableOptions.length > 0) return searchPlaceholder || searchPlaceholderText
    if (allowCustomValues) return typeAndEnterPlaceholderText
    return noOptionsPlaceholderText
  }, [
    chipManagement.chips.length,
    placeholder,
    availableOptions.length,
    searchPlaceholder,
    searchPlaceholderText,
    allowCustomValues,
    typeAndEnterPlaceholderText,
    noOptionsPlaceholderText
  ])

  const hasError = chipError || chipManagement.hasErrorChips
  const errorMessage = chipError || chipManagement.getErrorMessage()

  const containerClassName = useMemo(
    () =>
      classNames('multi-textarea-chips', className, {
        'multi-textarea-chips--disabled': disabled,
        'multi-textarea-chips--error': hasError
      }),
    [className, disabled, hasError]
  )

  const inputWrapperClassName = useMemo(
    () =>
      classNames('multi-textarea-input-wrapper', {
        'with-error-styles': hasError
      }),
    [hasError]
  )

  return (
    <div className={containerClassName} ref={containerRef}>
      {label && (
        <label className="multi-textarea-chips__label" htmlFor={`${fieldName}-input`}>
          {label}
        </label>
      )}

      <div className={inputWrapperClassName}>
        <div className="multi-textarea-chips__content">
          {chipManagement.chips.map((chip: ChipValue, index: number) => {
            const isItem = typeof chip === 'object'
            const text = isItem ? chip.text : chip
            const hasError = isItem ? Boolean(chip.hasError) : false

            return (
              <Chips
                key={`${text}-${index}`}
                text={text}
                withAction={!disabled}
                onClick={() => {
                  // Pass index instead of text to remove specific chip
                  chipManagement.removeChip(index)
                  setTimeout(() => {
                    inputRef.current?.focus()
                  }, 0)
                }}
                size="medium"
                color={hasError ? 'danger' : 'primary'}
                type="accent"
                disabled={disabled}
                aria-label={`Remove ${text} chip`}
              />
            )
          })}

          <div className="multi-textarea-chips__input-container">
            <input
              id={`${fieldName}-input`}
              {...formProps}
              autoComplete="off"
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={keyboardNavigation.handleKeyDown}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder={inputPlaceholder}
              className={'multi-textarea-chips__input'}
              disabled={disabled}
              aria-describedby={
                hasError ? `${fieldName}-error` : helperText ? `${fieldName}-helper` : undefined
              }
              aria-invalid={hasError ? 'true' : 'false'}
              aria-expanded={dropdownLogic.showDropdown}
              aria-autocomplete="list"
              role="combobox"
            />

            {dropdownLogic.showDropdown && dropdownLogic.filteredOptions.length > 0 && (
              <div
                className="multi-textarea-chips__dropdown"
                role="listbox"
                aria-label="Available options"
              >
                {dropdownLogic.filteredOptions.map((option) => (
                  <div
                    key={option}
                    className={classNames('multi-textarea-chips__dropdown-item', {
                      'multi-textarea-chips__dropdown-item--selected':
                        dropdownLogic.selectedOption === option
                    })}
                    onClick={() => handleSelectOption(option)}
                    role="option"
                    aria-selected={dropdownLogic.selectedOption === option}
                  >
                    <div className="multi-textarea-chips__radio">
                      <div
                        className={classNames('multi-textarea-chips__radio-button', {
                          'multi-textarea-chips__radio-button--selected':
                            dropdownLogic.selectedOption === option
                        })}
                      />
                    </div>
                    <span className="multi-textarea-chips__option-text">{option}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {hasError && <ErrorMessage message={errorMessage} />}

      {helperText && !hasError && (
        <div id={`${fieldName}-helper`} className="multi-textarea-chips__helper">
          {helperText}
        </div>
      )}
    </div>
  )
}

export const MultiTextareaWithChips = memo(MultiTextareaWithChipsComponent)

MultiTextareaWithChips.displayName = 'MultiTextareaWithChips'
