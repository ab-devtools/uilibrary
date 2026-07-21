import { useCallback, useMemo } from 'react'
import type { TUploadError, TUploadFile } from '../types'
import { UploadErrorType } from '../types'
import { checkIsAllowedFileSize, checkIsAllowedTypes } from '../../../utils/helpers'
import { UPLOAD_ERROR_MESSAGES } from '../consts'
import { generateFileId } from '../utils/formatters'

interface UseUploadFilesArgs {
  files: TUploadFile[]
  multiple: boolean
  allowedTypes?: string
  fileAllowedSize?: number
  maxFiles?: number
  onAdd?: (files: File[]) => void
  onError?: (error: TUploadError) => void
  setFieldValue?: (name: string, value: TFormValue) => void
  name?: string
}

interface UseUploadFilesResult {
  handleFilesSelected: (selected: FileList | File[] | null) => void
}

const isFile = (item: unknown): item is File => item instanceof File

export const useUploadFiles = ({
  files,
  multiple,
  allowedTypes,
  fileAllowedSize,
  maxFiles,
  onAdd,
  onError,
  setFieldValue,
  name
}: UseUploadFilesArgs): UseUploadFilesResult => {
  const existingIds = useMemo(() => new Set(files.map((f) => f.id)), [files])

  const dispatchError = useCallback(
    (type: UploadErrorType, invalid: File[]) => {
      if (!onError || invalid.length === 0) return
      onError({ type, message: UPLOAD_ERROR_MESSAGES[type], files: invalid })
    },
    [onError]
  )

  const partitionByRules = useCallback(
    (candidates: File[]) => {
      const byType: File[] = []
      const bySize: File[] = []
      const accepted: File[] = []

      candidates.forEach((file) => {
        if (allowedTypes && !checkIsAllowedTypes(allowedTypes, file.type)) {
          byType.push(file)
          return
        }
        if (fileAllowedSize && !checkIsAllowedFileSize(fileAllowedSize, file.size)) {
          bySize.push(file)
          return
        }
        accepted.push(file)
      })

      return { accepted, byType, bySize }
    },
    [allowedTypes, fileAllowedSize]
  )

  const handleFilesSelected = useCallback(
    (selected: FileList | File[] | null) => {
      if (!selected) return

      const asArray = Array.from(selected).filter(isFile)
      if (asArray.length === 0) return

      const candidates = multiple ? asArray : [asArray[0]]
      const uniqueCandidates = candidates.filter((f) => !existingIds.has(generateFileId(f)))

      const { accepted, byType, bySize } = partitionByRules(uniqueCandidates)

      dispatchError(UploadErrorType.type, byType)
      dispatchError(UploadErrorType.size, bySize)

      if (accepted.length === 0) return

      let toAdd = accepted
      if (typeof maxFiles === 'number') {
        const remaining = Math.max(maxFiles - files.length, 0)
        if (remaining === 0) {
          dispatchError(UploadErrorType.count, accepted)
          return
        }
        if (accepted.length > remaining) {
          dispatchError(UploadErrorType.count, accepted.slice(remaining))
          toAdd = accepted.slice(0, remaining)
        }
      }

      if (toAdd.length === 0) return

      onAdd?.(toAdd)

      if (name && setFieldValue) {
        setFieldValue(name, toAdd)
      }
    },
    [
      existingIds,
      partitionByRules,
      dispatchError,
      multiple,
      maxFiles,
      files.length,
      onAdd,
      name,
      setFieldValue
    ]
  )

  return { handleFilesSelected }
}
