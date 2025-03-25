import dayjs from 'dayjs'

export const noop = (): void => {
  return undefined
}

export const checkIsAllowedFileSize = (allowedSize: number, fileSize: number): boolean => {
  return fileSize <= allowedSize
}

export const openFileInNewWindow = ({
  e,
  file,
  handleFileClick
}: {
  e: TClickEventType
  file: File
  handleFileClick?: (file: File) => void
}): void => {
  e.preventDefault()

  if (handleFileClick) {
    handleFileClick(file)
  }

  if (file) {
    if (file instanceof Blob) {
      const fileURL = URL.createObjectURL(file)
      window.open(fileURL)
    } else {
      console.error('The provided object is not a File or Blob.')
    }
  } else {
    console.error('No file provided.')
  }
}

export const getFormattedValues = (files: File[]): FileReader[] => {
  const readers: FileReader[] = []

  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader()
    reader.onloadend = () => {
      console.log(reader.result)
    }
    reader.readAsDataURL(files[i])
    readers.push(reader)
  }

  return readers
}

export const uniqueFiles = (files: File[]): File[] =>
  files.filter((file, index, self) => {
    return index === self.findIndex((f) => f.name === file.name)
  })

export const checkIsAllowedTypes = (allowedTypes: string, mimeType: string): boolean => {
  return allowedTypes.includes(mimeType)
}

export const getStringWidth = (text: string, fontSize: number): number => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) {
    return 0
  }
  context.font = fontSize + 'px Arial'

  return context.measureText(text).width
}

export const setTranslationValue = (translation: string, value: string | number): string => {
  return translation.replace('%s', value.toString())
}

export const getYearOptions = (startYear: number, lastYear: number): TSelectOptions => {
  const years = []

  while (startYear <= lastYear) {
    years.push({ value: lastYear, label: lastYear })
    lastYear--
  }
  return years
}

export const isSameDay = (date1?: Date, date2?: Date): boolean => {
  if (!date1 || !date2) {
    return false
  }

  return dayjs(date1).isSame(date2, 'day')
}

