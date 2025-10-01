import { useCallback } from 'react'
import type { KeyboardEvent } from 'react'

interface UseKeyboardNavigationProps {
  disabled: boolean
  inputValue: string
  allowCustomValues: boolean
  chips: Array<string | { text: string; [key: string]: unknown }>
  filteredOptions: string[]
  selectedOption: string
  onAddCustomValue: (value: string) => void
  onNavigateOptions: (direction: 'up' | 'down') => void
  onSelectOption: (option?: string) => void
  onCloseDropdown: () => void
  onRemoveLastChip: () => void
  inputRef: React.RefObject<HTMLInputElement | null>
}

export const useKeyboardNavigation = ({
  disabled,
  inputValue,
  allowCustomValues,
  chips,
  filteredOptions,
  selectedOption,
  onAddCustomValue,
  onNavigateOptions,
  onSelectOption,
  onCloseDropdown,
  onRemoveLastChip,
  inputRef
}: UseKeyboardNavigationProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return

      const trimmedInput = inputValue.trim()

      switch (e.key) {
        case 'Enter':
          e.preventDefault()
          if (selectedOption) {
            onSelectOption(selectedOption)
          } else if (filteredOptions.length > 0) {
            onSelectOption(filteredOptions[0])
          } else if (allowCustomValues && trimmedInput) {
            onAddCustomValue(trimmedInput)
          }
          break

        case ',':
          if (allowCustomValues && trimmedInput) {
            e.preventDefault()
            onAddCustomValue(trimmedInput)
          }
          break

        case ' ':
        case 'Space':
          if (allowCustomValues && trimmedInput) {
            e.preventDefault()
            onAddCustomValue(trimmedInput)
          }
          break

        case 'Escape':
          onCloseDropdown()
          inputRef.current?.blur()
          break

        case 'ArrowDown':
          e.preventDefault()
          onNavigateOptions('down')
          break

        case 'ArrowUp':
          e.preventDefault()
          onNavigateOptions('up')
          break

        case 'Backspace':
          if (!inputValue && chips.length > 0) {
            e.preventDefault()
            onRemoveLastChip()
          }
          break

        default:
          break
      }
    },
    [
      disabled,
      inputValue,
      allowCustomValues,
      chips.length,
      filteredOptions,
      selectedOption,
      onAddCustomValue,
      onNavigateOptions,
      onSelectOption,
      onCloseDropdown,
      onRemoveLastChip,
      inputRef
    ]
  )

  return { handleKeyDown }
}
