import { useCallback } from 'react'
import type { OnBlurConfig, OnBlurBehavior } from '../types'
import type { AnySchema } from 'yup'

interface UseOnBlurLogicProps {
  inputValue: string
  disabled: boolean
  allowCustomValues: boolean
  availableOptions: string[]
  minChipLength?: number
  maxChipLength?: number
  onBlurConfig?: OnBlurConfig
  onAddCustomValue: (value: string) => void
  chipValidationSchema?: AnySchema
  allowInvalidChips?: boolean
}

export const useOnBlurLogic = ({
  inputValue,
  disabled,
  allowCustomValues,
  availableOptions,
  minChipLength,
  maxChipLength,
  onBlurConfig,
  onAddCustomValue,
  chipValidationSchema,
  allowInvalidChips = false
}: UseOnBlurLogicProps) => {
  const validateValue = useCallback(
    (value: string): boolean => {
      const trimmedValue = value.trim()

      if (minChipLength && trimmedValue.length < minChipLength) {
        return false
      }

      if (maxChipLength && trimmedValue.length > maxChipLength) {
        return false
      }

      if (chipValidationSchema) {
        try {
          chipValidationSchema.validateSync(trimmedValue)
          return true
        } catch {
          return allowInvalidChips
        }
      }

      return true
    },
    [minChipLength, maxChipLength, chipValidationSchema, allowInvalidChips]
  )

  const handleInputBlur = useCallback(() => {
    const trimmedValue = inputValue.trim()

    if (!trimmedValue || disabled) {
      return
    }

    const behavior: OnBlurBehavior = onBlurConfig?.behavior || 'add-chip'
    const config = onBlurConfig || { behavior: 'add-chip' }

    switch (behavior) {
      case 'add-chip':
        if (allowCustomValues || availableOptions.includes(trimmedValue)) {
          onAddCustomValue(trimmedValue)
        }
        break

      case 'add-if-valid':
        if (validateValue(trimmedValue)) {
          onAddCustomValue(trimmedValue)
        }
        break

      case 'add-if-available':
        if (availableOptions.includes(trimmedValue)) {
          onAddCustomValue(trimmedValue)
        }
        break

      case 'add-if-min-length': {
        const minLength = config?.minLength || minChipLength || 1
        if (trimmedValue.length >= minLength) {
          onAddCustomValue(trimmedValue)
        }
        break
      }

      case 'ignore':
        break

      default:
        if (allowCustomValues || availableOptions.includes(trimmedValue)) {
          onAddCustomValue(trimmedValue)
        }
        break
    }
  }, [
    inputValue,
    disabled,
    allowCustomValues,
    availableOptions,
    onBlurConfig,
    validateValue,
    onAddCustomValue,
    minChipLength
  ])

  return {
    handleInputBlur
  }
}
