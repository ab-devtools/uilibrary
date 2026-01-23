import dayjs from 'dayjs'

type TDateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD' | 'MM.DD.YYYY' | 'DD.MM.YYYY'

type TDateValidationProp = {
  date: string
  format?: TDateFormat
  minYear?: number
  maxYear?: number
}

type TCombineDateProp = {
  date: string
  time?: string
  format?: TDateFormat
}

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

export const isSameDate = (d1: Date, d2: Date) => dayjs(d1).isSame(d2, 'day')

export const isSameRange = (r1: [Date | null, Date | null], r2: [Date | null, Date | null]) => {
  const [start1, end1] = r1
  const [start2, end2] = r2

  const startEqual = start1 && start2 ? isSameDate(start1, start2) : start1 === start2
  const endEqual = end1 && end2 ? isSameDate(end1, end2) : end1 === end2

  return startEqual && endEqual
}

export const getMonthByIndex = (index: number, base = dayjs()) =>
  base.add(index, 'month').startOf('month')

export const isMobile = () => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
    /Tablet/i,
    /Mobile/i
  ]

  // Check user agent
  const isMatchedDevice = toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem)
  })

  // Check for iPad (including iPad Air with iPadOS 13+)
  const isIPad =
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
    navigator.platform === 'iPad'

  // Check for any touch device with Mac user agent
  const isTouchMac = /Mac/.test(navigator.userAgent) && 'ontouchend' in document

  return isMatchedDevice || isIPad || isTouchMac
}

export const formatDateByPattern = (value: string, format?: TDateFormat): string => {
  const dateFormat = format || 'MM/DD/YYYY'
  const digits = value.replace(/\D/g, '')

  const partLengthsMap: Record<TDateFormat, number[]> = {
    'MM/DD/YYYY': [2, 2, 4],
    'DD/MM/YYYY': [2, 2, 4],
    'YYYY-MM-DD': [4, 2, 2],
    'MM.DD.YYYY': [2, 2, 4],
    'DD.MM.YYYY': [2, 2, 4]
  }

  const separator = dateFormat.match(/[^A-Z]/)?.[0]
  if (!separator) return value

  const partsLengths = partLengthsMap[dateFormat]

  let cursor = 0
  const result: string[] = []

  for (const length of partsLengths) {
    const part = digits.slice(cursor, cursor + length)
    if (!part) break
    result.push(part)
    cursor += length
  }

  return result.join(separator)
}

export const formatTime = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (!digits) return ''

  const hours = digits.slice(0, 2)
  const minutes = digits.slice(2, 4)

  if (digits.length <= 2) {
    return hours
  }
  return `${hours}:${minutes}`
}

export const isValidDate = ({ date, format, minYear, maxYear }: TDateValidationProp) => {
  if (!date) return false

  const dateFormat = format || 'MM/DD/YYYY'
  const parsed = dayjs(date, dateFormat, true)

  if (!parsed.isValid()) return false

  const year = parsed.year()
  const min = minYear ?? 1900
  const max = maxYear ?? 2050

  return year >= min && year <= max
}

export const orderRangeDate = (
  start: Date | null,
  end: Date | null
): [Date | null, Date | null] => {
  const s: Date | null = start && !isNaN(start.getTime()) ? start : null
  const e: Date | null = end && !isNaN(end.getTime()) ? end : null

  if (!s && e) return [e, null]
  if (!e) return [s, null]

  return dayjs(s).isBefore(e) || dayjs(s).isSame(e, 'day') ? [s, e] : [e, s]
}

export const combineDateTime = ({ date, time, format }: TCombineDateProp) => {
  if (!date) return null

  const dateFormat = format || 'MM/DD/YYYY'
  const timePart = time?.trim() || '00:00'

  const dateTime = dayjs(`${date} ${timePart}`, `${dateFormat} HH:mm`, true)

  return dateTime.isValid() ? dateTime.toDate() : null
}
