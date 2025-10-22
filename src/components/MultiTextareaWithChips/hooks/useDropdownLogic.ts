import { useState, useEffect, useCallback } from 'react'

interface UseDropdownLogicProps {
  availableOptions: string[]
  chipTexts: string[]
  containerRef: React.RefObject<HTMLDivElement | null>
}

export const useDropdownLogic = ({
  availableOptions,
  chipTexts,
  containerRef
}: UseDropdownLogicProps) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string>('')

  const filterOptions = useCallback(
    (inputValue: string) => {
      if (availableOptions.length === 0) return

      const filtered = availableOptions.filter(
        (option) =>
          option.toLowerCase().includes(inputValue.toLowerCase()) && !chipTexts.includes(option)
      )
      setFilteredOptions(filtered)
    },
    [availableOptions, chipTexts]
  )

  const handleInputFocus = useCallback(
    (inputValue: string) => {
      if (availableOptions.length > 0) {
        if (inputValue.trim()) {
          setShowDropdown(true)
        } else {
          filterOptions('')
          setShowDropdown(true)
        }
      }
    },
    [availableOptions.length, filterOptions]
  )

  const handleInputChange = useCallback(
    (inputValue: string) => {
      setSelectedOption('')
      filterOptions(inputValue)
      setShowDropdown(availableOptions.length > 0 && inputValue.trim().length > 0)
    },
    [filterOptions, availableOptions.length]
  )

  const navigateOptions = useCallback(
    (direction: 'up' | 'down') => {
      if (filteredOptions.length === 0) return

      const currentIndex = selectedOption ? filteredOptions.indexOf(selectedOption) : -1
      let nextIndex: number

      if (direction === 'down') {
        nextIndex = currentIndex < filteredOptions.length - 1 ? currentIndex + 1 : 0
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : filteredOptions.length - 1
      }

      setSelectedOption(filteredOptions[nextIndex])
    },
    [filteredOptions, selectedOption]
  )

  const selectOption = useCallback(
    (option?: string) => {
      const optionToSelect = option || selectedOption || filteredOptions[0]
      if (optionToSelect) {
        setShowDropdown(false)
        setSelectedOption('')
        return optionToSelect
      }
      return null
    },
    [selectedOption, filteredOptions]
  )

  const closeDropdown = useCallback(() => {
    setShowDropdown(false)
    setSelectedOption('')
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeDropdown()
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown, closeDropdown, containerRef])

  return {
    showDropdown,
    filteredOptions,
    selectedOption,
    handleInputFocus,
    handleInputChange,
    navigateOptions,
    selectOption,
    closeDropdown
  }
}
