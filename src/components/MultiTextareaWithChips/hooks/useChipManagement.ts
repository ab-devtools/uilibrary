import { useState, useEffect, useCallback, useRef } from 'react'
import type { ChipValue, TChipItem } from '../types'

interface UseChipManagementProps {
  initialChips: ChipValue[]
  fieldName: string
  formProps?: {
    setFieldValue?: (fieldName: string, value: TFormValue) => void
    [key: string]: TFormValue | ((fieldName: string, value: TFormValue) => void) | undefined
  }
  setValue?: (fieldName: string, value: TFormValue) => void
  onAddChip?: (chip: string) => void
  onRemoveChip?: (chip: string) => void
}

export const useChipManagement = ({
  initialChips,
  fieldName,
  formProps,
  setValue,
  onAddChip,
  onRemoveChip
}: UseChipManagementProps) => {
  const [chips, setChips] = useState<ChipValue[]>(initialChips)
  const isUserInteraction = useRef(false)

  useEffect(() => {
    if (!isUserInteraction.current) {
      setChips(initialChips)
    }
  }, [initialChips])

  const updateFormValue = useCallback(
    (newChips: ChipValue[]) => {
      if (isUserInteraction.current) {
        if (formProps?.setFieldValue) {
          formProps.setFieldValue(fieldName, newChips as TFormValue)
        }
        if (setValue) {
          setValue(fieldName, newChips as TFormValue)
        }
      }
    },
    [formProps, setValue, fieldName]
  )

  const addChip = useCallback(
    (chip: ChipValue) => {
      isUserInteraction.current = true
      const newChips = [...chips, chip]
      setChips(newChips)
      updateFormValue(newChips)

      if (typeof chip === 'string') {
        onAddChip?.(chip)
      } else {
        onAddChip?.(chip.text)
      }
    },
    [chips, updateFormValue, onAddChip]
  )

  const removeChip = useCallback(
    (chipText: string) => {
      isUserInteraction.current = true
      const newChips = chips.filter((chip) => {
        const text = typeof chip === 'string' ? chip : chip.text
        return text !== chipText
      })
      setChips(newChips)
      updateFormValue(newChips)
      onRemoveChip?.(chipText)
    },
    [chips, updateFormValue, onRemoveChip]
  )

  const getChipTexts = useCallback(() => {
    return chips.map((chip) => (typeof chip === 'string' ? chip : chip.text))
  }, [chips])

  const hasErrorChips = chips.some((chip) => {
    return typeof chip === 'object' && chip.hasError
  })

  const getErrorMessage = useCallback(() => {
    const errorChips = chips.filter((chip) => {
      return typeof chip === 'object' && chip.hasError
    }) as TChipItem[]
    const firstError = errorChips.find((chip) => chip.errorMessage)
    return firstError?.errorMessage || ''
  }, [chips])

  return {
    chips,
    addChip,
    removeChip,
    getChipTexts,
    hasErrorChips,
    getErrorMessage
  }
}
