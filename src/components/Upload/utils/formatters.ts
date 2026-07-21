import { FILE_SIZE_UNITS } from '../consts'

export const formatFileSize = (bytes: number, fractionDigits = 1): string => {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'

  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    FILE_SIZE_UNITS.length - 1
  )
  const value = bytes / Math.pow(1024, exponent)
  const rounded = exponent === 0 ? Math.round(value) : Number(value.toFixed(fractionDigits))

  return `${rounded} ${FILE_SIZE_UNITS[exponent]}`
}

export const generateFileId = (file: File): string => {
  return `${file.name}-${file.size}-${file.lastModified}`
}
