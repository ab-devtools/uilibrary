import type { KeyboardEvent } from 'react'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Chips } from '../Chips'
import type { TChipItem, TMultiTextareaWithChipsProps } from './types'
import { ErrorMessage } from '../../helperComponents'
import classNames from 'classnames'
import { useFormProps } from '../../hooks'

export const MultiTextareaWithChips: React.FC<TMultiTextareaWithChipsProps> = ({
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
  searchPlaceholder,
  chipValidationSchema,
  chipValidationErrorMessage,
  allowInvalidChips = false,
  // Customizable placeholder messages
  searchPlaceholderText = 'Search and select...',
  typeAndEnterPlaceholderText = 'Type and press Enter...',
  noOptionsPlaceholderText = 'No more options available',
  fieldName = 'skills',
  formProps
}) => {
  const [inputValue, setInputValue] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [chipError, setChipError] = useState<string>('')
  const [localChips, setLocalChips] = useState<Array<string | TChipItem>>(chips)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { setValue } = useFormProps()

  const chipTexts = localChips.map((chip) => (typeof chip === 'string' ? chip : chip.text))

  const isUserInteraction = useRef(false)

  useEffect(() => {
    if (!isUserInteraction.current) {
      setLocalChips(chips)
    }
  }, [chips])

  useEffect(() => {
    if (isUserInteraction.current && formProps?.setFieldValue) {
      formProps.setFieldValue(fieldName, localChips as TFormValue)
    }
  }, [localChips, fieldName])

  // Helper function to filter options
  const filterOptions = useCallback(
    (value: string) => {
      if (availableOptions.length > 0) {
        const currentChipTexts = localChips.map((chip) =>
          typeof chip === 'string' ? chip : chip.text
        )
        const filtered = availableOptions.filter(
          (option) =>
            option.toLowerCase().includes(value.toLowerCase()) && !currentChipTexts.includes(option)
        )
        setFilteredOptions(filtered)
      }
    },
    [availableOptions, localChips]
  )

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
        setSelectedOption('')
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedOption) {
        handleSelectOption(selectedOption)
      } else if (filteredOptions.length > 0) {
        handleSelectOption(filteredOptions[0])
        setFilteredOptions([])
      } else if (allowCustomValues && inputValue.trim()) {
        handleAddCustomValue(inputValue.trim())
      }
    } else if (e.key === ',' && allowCustomValues && inputValue.trim()) {
      e.preventDefault()
      handleAddCustomValue(inputValue.trim())
    } else if ((e.key === ' ' || e.code === 'Space') && allowCustomValues && inputValue.trim()) {
      e.preventDefault()
      handleAddCustomValue(inputValue.trim())
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
      setSelectedOption('')
      inputRef.current?.blur()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (filteredOptions.length > 0) {
        const currentIndex = selectedOption ? filteredOptions.indexOf(selectedOption) : -1
        const nextIndex = currentIndex < filteredOptions.length - 1 ? currentIndex + 1 : 0
        setSelectedOption(filteredOptions[nextIndex])
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (filteredOptions.length > 0) {
        const currentIndex = selectedOption ? filteredOptions.indexOf(selectedOption) : -1
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredOptions.length - 1
        setSelectedOption(filteredOptions[prevIndex])
      }
    } else if (e.key === 'Backspace' && !inputValue && localChips.length > 0) {
      e.preventDefault()
      const lastChip = localChips[localChips.length - 1]
      const chipText = typeof lastChip === 'string' ? lastChip : lastChip.text
      handleRemoveChip(chipText)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return
    const value = e.target.value
    setInputValue(value)
    setSelectedOption('')

    // Filter available options based on input
    filterOptions(value)
    setShowDropdown(availableOptions.length > 0 && value.trim().length > 0)
  }

  const handleInputFocus = () => {
    if (availableOptions.length > 0) {
      if (inputValue.trim()) {
        setShowDropdown(true)
      } else {
        // Show all available options when focusing without input
        filterOptions('')
        setShowDropdown(true)
      }
    }
  }

  const handleRemoveChip = (chipToRemove: string) => {
    if (disabled) return
    isUserInteraction.current = true
    const newChips = localChips.filter((c: string | TChipItem) => {
      const chipText = typeof c === 'string' ? c : c.text
      return chipText !== chipToRemove
    })
    setLocalChips(newChips)
    onRemoveChip?.(chipToRemove)

    // Update form values consistently
    if (formProps?.setFieldValue) {
      formProps.setFieldValue(fieldName, newChips as TFormValue)
    }
    if (setValue) {
      setValue(fieldName, newChips)
    }

    setChipError('')

    // Refresh filtered options when chip is removed
    if (showDropdown) {
      filterOptions(inputValue)
    }
  }

  const handleSelectOption = (option: string) => {
    isUserInteraction.current = true
    if (!chipTexts.includes(option)) {
      if (chipValidationSchema) {
        try {
          chipValidationSchema.validateSync(option)
        } catch (e) {
          const message = chipValidationErrorMessage || (e as Error).message || 'Invalid value'
          if (allowInvalidChips) {
            const item: TChipItem = { text: option, hasError: true, errorMessage: message }
            const newChips = [...localChips, item]
            setLocalChips(newChips)

            // Update form values consistently
            if (formProps?.setFieldValue) {
              formProps.setFieldValue(fieldName, newChips as TFormValue)
            }
            if (setValue) {
              setValue(fieldName, newChips)
            }

            setInputValue('')
            setShowDropdown(false)
            setSelectedOption('')
            return
          } else {
            setChipError(message)
            return
          }
        }
      }

      onAddChip?.(option)

      // Create consistent chip item structure
      const item: TChipItem = { text: option, hasError: false, errorMessage: '' }
      const newChips = [...localChips, item]
      setLocalChips(newChips)

      // Update form values consistently
      if (formProps?.setFieldValue) {
        formProps.setFieldValue(fieldName, newChips as TFormValue)
      }
      if (setValue) {
        setValue(fieldName, newChips)
      }

      setInputValue('')
      setShowDropdown(false)
      setSelectedOption('')
      setChipError('')
    }
  }

  const handleAddCustomValue = (value: string) => {
    isUserInteraction.current = true
    const chipTexts = localChips.map((chip) => (typeof chip === 'string' ? chip : chip.text))
    if (!chipTexts.includes(value)) {
      if (chipValidationSchema) {
        try {
          chipValidationSchema.validateSync(value)
          const item: TChipItem = { text: value, hasError: false, errorMessage: '' }
          const newChips = [...localChips, item]
          setLocalChips(newChips)

          // Update form values consistently
          if (formProps?.setFieldValue) {
            formProps.setFieldValue(fieldName, newChips as TFormValue)
          }
          if (setValue) {
            setValue(fieldName, newChips)
          }
        } catch (e) {
          const message = chipValidationErrorMessage || (e as Error).message || 'Invalid value'
          if (allowInvalidChips) {
            const item: TChipItem = { text: value, hasError: true, errorMessage: message }
            const newChips = [...localChips, item]
            setLocalChips(newChips)
            if (formProps?.setFieldValue) {
              formProps?.setFieldValue(fieldName, newChips as TFormValue)
            }
            if (setValue) {
              setValue(fieldName, newChips)
            }
          } else {
            setChipError(message)
            return
          }
        }
      } else {
        const newChips = [...localChips, value]
        setLocalChips(newChips)

        // Update form values consistently
        if (formProps?.setFieldValue) {
          formProps.setFieldValue(fieldName, newChips as TFormValue)
        }
        if (setValue) {
          setValue(fieldName, newChips)
        }
      }

      setInputValue('')
      setChipError('')
    }
  }

  const hasErrorChips = localChips.some((chip) => {
    return typeof chip === 'object' && chip.hasError
  })

  const getErrorMessage = () => {
    const errorChips = localChips.filter((chip) => {
      return typeof chip === 'object' && chip.hasError
    }) as TChipItem[]

    const firstError = errorChips.find((chip) => chip.errorMessage)
    return firstError?.errorMessage || ''
  }

  const getInputPlaceholder = () => {
    if (localChips.length === 0) return placeholder
    if (availableOptions.length > 0) return searchPlaceholder || searchPlaceholderText
    if (allowCustomValues) return typeAndEnterPlaceholderText
    return noOptionsPlaceholderText
  }

  return (
    <div className={classNames('multi-textarea-chips', className)} ref={containerRef}>
      {label && <div className="multi-textarea-chips__label">{label}</div>}

      <div
        className={classNames('multi-textarea-input-wrapper', {
          'with-error-styles': !!chipError || hasErrorChips
        })}
      >
        <div className="multi-textarea-chips__content">
          {localChips.map((chip: string | TChipItem, index: number) => {
            const isItem = typeof chip !== 'string'
            const text = isItem ? (chip as TChipItem).text : (chip as string)
            const hasError = isItem ? Boolean((chip as TChipItem).hasError) : false
            return (
              <Chips
                key={`${text}-${index}`}
                text={text}
                withAction={true}
                onClick={() => handleRemoveChip(text)}
                size="medium"
                color={hasError ? 'danger' : 'primary'}
                type="accent"
                disabled={disabled}
              />
            )
          })}
          <div className="multi-textarea-chips__input-container">
            <input
              {...formProps}
              autoComplete="off"
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              placeholder={getInputPlaceholder()}
              className="multi-textarea-chips__input"
              disabled={disabled}
            />
            {showDropdown && (
              <div className="multi-textarea-chips__dropdown">
                {filteredOptions.map((option) => (
                  <div
                    key={option}
                    className={classNames('multi-textarea-chips__dropdown-item', {
                      'multi-textarea-chips__dropdown-item--selected': selectedOption === option
                    })}
                    onClick={() => handleSelectOption(option)}
                  >
                    <div className="multi-textarea-chips__radio">
                      <div
                        className={classNames('multi-textarea-chips__radio-button', {
                          'multi-textarea-chips__radio-button--selected': selectedOption === option
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

      {!!chipError && <ErrorMessage message={chipError} />}

      {hasErrorChips && !chipError && <ErrorMessage message={getErrorMessage()} />}

      {helperText && !chipError && !hasErrorChips && (
        <div className="multi-textarea-chips__helper">{helperText}</div>
      )}
    </div>
  )
}

MultiTextareaWithChips.displayName = 'MultiTextareaWithChips'
