import { useCallback } from 'react'
import type { AnySchema } from 'yup'
import type { TChipItem } from '../types'

interface UseChipValidationProps {
  validationSchema?: AnySchema
  errorMessage?: string
  allowInvalidChips?: boolean
  minChipLength?: number
  maxChipLength?: number
}

export const useChipValidation = ({
  validationSchema,
  errorMessage,
  allowInvalidChips = false,
  minChipLength,
  maxChipLength
}: UseChipValidationProps) => {
  const createValidatedChip = useCallback(
    (chipText: string): TChipItem => {
      const trimmedText = chipText.trim()

      if (minChipLength && trimmedText.length < minChipLength) {
        const message = `Chip must be at least ${minChipLength} characters long`
        if (!allowInvalidChips) {
          throw new Error(message)
        }
        return { text: trimmedText, hasError: true, errorMessage: message }
      }

      if (maxChipLength && trimmedText.length > maxChipLength) {
        const message = `Chip must be no more than ${maxChipLength} characters long`
        if (!allowInvalidChips) {
          throw new Error(message)
        }
        return { text: trimmedText, hasError: true, errorMessage: message }
      }

      if (validationSchema) {
        try {
          validationSchema.validateSync(trimmedText)
          return { text: trimmedText, hasError: false, errorMessage: '' }
        } catch (error) {
          const message = errorMessage || (error as Error).message || 'Invalid value'
          if (!allowInvalidChips) {
            throw new Error(message)
          }
          return { text: trimmedText, hasError: true, errorMessage: message }
        }
      }

      return { text: trimmedText, hasError: false, errorMessage: '' }
    },
    [validationSchema, errorMessage, allowInvalidChips, minChipLength, maxChipLength]
  )

  return {
    createValidatedChip
  }
}
