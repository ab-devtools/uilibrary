import type { JSX } from 'react'
import type { FILE_UPLOAD_ERRORS } from '../../consts'
import type { IFormCompProps } from '../../types/globalTypes'

export interface TFileUploadProps extends IFormCompProps {
  allowedTypes?: string
  label?: string | JSX.Element
  buttonText?: string | JSX.Element
  getFiles?: (files: File[]) => void
  handleFileClick?: (file: File) => void
  removeFiles?: (file: File) => void
  toBase64?: boolean
  required?: boolean
  disabled?: boolean
  isFileUploaded?: boolean
  withFilePreview?: boolean
  uploadedFiles?: File[]
  multiple?: boolean
  mode?: FileUploadMode
  labelAddons?: JSX.Element
  onError?: (errorType: FILE_UPLOAD_ERRORS) => void
  fileAllowedSize?: number
}

export enum FileUploadMode {
  edit = 'edit',
  attach = 'attach'
}

export interface IUploadItemPropTypes {
  name?: string
  onRemove: (file: File, index: number) => void
  fileType?: string
  isFileUploaded?: boolean
  error?: boolean
  handleFileClick?: (file: File) => void
  withFilePreview?: boolean
  files: File[]
}
