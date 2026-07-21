import type { JSX, ReactNode } from 'react'

export enum UploadErrorType {
  size = 'size',
  type = 'type',
  count = 'count'
}

export enum UploadFileStatus {
  idle = 'idle',
  uploading = 'uploading',
  success = 'success',
  error = 'error'
}

export interface TUploadFile {
  id: string
  name: string
  size?: number
  type?: string
  file?: File
  url?: string
  progress?: number
  status?: UploadFileStatus
  errorMessage?: string
}

export interface TUploadError {
  type: UploadErrorType
  message: string
  files?: File[]
}

export type TUploadFilesLayout = 'list' | 'carousel'

export type TUploadDropzoneSize = 'default' | 'small'

export interface TUploadProps extends IFormCompProps {
  label?: string | JSX.Element
  helperText?: string
  buttonText?: string | JSX.Element
  browseText?: ReactNode
  dropZoneText?: ReactNode
  dropZoneHint?: ReactNode
  illustration?: ReactNode
  files?: TUploadFile[]
  allowedTypes?: string
  fileAllowedSize?: number
  maxFiles?: number
  multiple?: boolean
  disabled?: boolean
  required?: boolean
  withDropZone?: boolean
  dropzoneSize?: TUploadDropzoneSize
  filesLayout?: TUploadFilesLayout
  downloadedIds?: Set<string> | string[]
  downloadedLabel?: string
  uploadFailedLabel?: string
  retryAriaLabel?: string
  removeAriaLabel?: string
  downloadAriaLabel?: string
  uploadingAriaLabel?: string
  prevAriaLabel?: string
  nextAriaLabel?: string
  className?: string
  labelAddons?: JSX.Element
  onAdd?: (files: File[]) => void
  onRemove?: (file: TUploadFile) => void
  onDownload?: (file: TUploadFile) => void
  onRetry?: (file: TUploadFile) => void
  onFileClick?: (file: TUploadFile) => void
  onError?: (error: TUploadError) => void
}

export interface TAttachmentCardProps {
  file: TUploadFile
  disabled?: boolean
  downloaded?: boolean
  downloadedLabel?: string
  uploadFailedLabel?: string
  retryAriaLabel?: string
  removeAriaLabel?: string
  downloadAriaLabel?: string
  uploadingAriaLabel?: string
  fullWidth?: boolean
  onRemove?: (file: TUploadFile) => void
  onDownload?: (file: TUploadFile) => void
  onRetry?: (file: TUploadFile) => void
  onClick?: (file: TUploadFile) => void
}

export interface TScrollableCarouselProps {
  children: ReactNode
  className?: string
  scrollStep?: number
  prevAriaLabel?: string
  nextAriaLabel?: string
}

export interface TFileTypeConfig {
  Icon: TSVGIconComponent
  color: 'brand' | 'danger' | 'warning' | 'success' | 'info' | 'discovery' | 'grey'
  label: string
}
