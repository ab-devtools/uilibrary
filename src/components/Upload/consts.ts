export const DEFAULT_ALLOWED_TYPES =
  'application/pdf, .png, .jpg, .jpeg, image/jpeg, image/png, image/jpg, text/plain, image/*, .pdf, .doc, .docx, application/vnd'

export const DEFAULT_MAX_FILE_SIZE = 25 * 1024 * 1024

export const DEFAULT_SCROLL_STEP = 240

export const UPLOAD_ERROR_MESSAGES = {
  size: 'File size exceeds the allowed limit.',
  type: 'File type is not allowed.',
  count: 'You have reached the maximum number of files.'
} as const

export const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const
