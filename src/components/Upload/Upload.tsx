import type { DragEvent, ReactElement } from 'react'
import React, { memo, useCallback, useMemo, useRef, useState } from 'react'
import classnames from 'classnames'
import { Button } from '../Button'
import { Text } from '../Text'
import { Label, ErrorMessage } from '../../helperComponents'
import IconAttach from '../SVGIcons/IconAttach'
import {
  AttachmentCard,
  ScrollableCarousel,
  UploadIllustration,
  UploadIllustrationSmall
} from './subcomponents'
import { useUploadFiles } from './hooks'
import type { TUploadFile, TUploadProps } from './types'
import { DEFAULT_ALLOWED_TYPES } from './consts'

const toDownloadedSet = (
  downloadedIds: TUploadProps['downloadedIds']
): Set<string> | undefined => {
  if (!downloadedIds) return undefined
  return downloadedIds instanceof Set ? downloadedIds : new Set(downloadedIds)
}

const UploadComponent = (props: TUploadProps): ReactElement => {
  const {
    label,
    helperText,
    labelAddons,
    buttonText = 'Կցել ֆայլ',
    browseText = 'Ներբեռնեք ֆայլը',
    dropZoneText = 'կամ տեղափոխեք այստեղ',
    dropZoneHint = 'JPEG, PNG, PDF, DOC և MP4 ձևաչափեր՝ մինչև 50 ՄԲ',
    illustration,
    files = [],
    allowedTypes = DEFAULT_ALLOWED_TYPES,
    fileAllowedSize,
    maxFiles,
    multiple = true,
    disabled = false,
    required = false,
    withDropZone = true,
    dropzoneSize = 'default',
    filesLayout = 'list',
    downloadedIds,
    downloadedLabel,
    uploadFailedLabel,
    retryAriaLabel,
    removeAriaLabel,
    downloadAriaLabel,
    uploadingAriaLabel,
    prevAriaLabel,
    nextAriaLabel,
    className = '',
    name,
    setFieldValue,
    dataId,
    hasError,
    onAdd,
    onRemove,
    onDownload,
    onRetry,
    onFileClick,
    onError
  } = props

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const downloadedSet = useMemo(() => toDownloadedSet(downloadedIds), [downloadedIds])

  const { handleFilesSelected } = useUploadFiles({
    files,
    multiple,
    allowedTypes,
    fileAllowedSize,
    maxFiles,
    onAdd,
    onError,
    setFieldValue,
    name
  })

  const openFileDialog = useCallback(() => {
    if (disabled) return
    fileInputRef.current?.click()
  }, [disabled])

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleFilesSelected(event.target.files)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    },
    [handleFilesSelected]
  )

  const handleDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      if (disabled) return
      event.preventDefault()
      event.stopPropagation()
      if (!isDragging) setIsDragging(true)
    },
    [disabled, isDragging]
  )

  const handleDragLeave = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      setIsDragging(false)
    },
    []
  )

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      setIsDragging(false)
      if (disabled) return
      handleFilesSelected(event.dataTransfer?.files || null)
    },
    [disabled, handleFilesSelected]
  )

  const isMaxReached = typeof maxFiles === 'number' && files.length >= maxFiles

  return (
    <div
      className={classnames('upload', className, {
        'upload--disabled': disabled,
        'upload--error': hasError
      })}
      data-id={dataId}
    >
      {label ? (
        <Label text={label} required={required} disabled={disabled} labelAddons={labelAddons} />
      ) : null}

      <input
        ref={fileInputRef}
        type="file"
        name={name}
        className="upload__native-input"
        accept={allowedTypes}
        multiple={multiple}
        disabled={disabled || isMaxReached}
        onChange={handleInputChange}
        data-id={dataId ? `${dataId}-input` : undefined}
      />

      {withDropZone ? (
        <div
          className={classnames('upload__dropzone', {
            'upload__dropzone--small': dropzoneSize === 'small',
            'upload__dropzone--dragging': isDragging,
            'upload__dropzone--disabled': disabled || isMaxReached
          })}
          onClick={openFileDialog}
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled || isMaxReached}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              openFileDialog()
            }
          }}
        >
          <div className="upload__dropzone-illustration">
            {illustration ||
              (dropzoneSize === 'small' ? <UploadIllustrationSmall /> : <UploadIllustration />)}
          </div>

          <div className="upload__dropzone-content">
            <Text size="standard" weight="semibold" className="upload__dropzone-title">
              <span className="upload__dropzone-link">{browseText}</span>
              {dropZoneText ? (
                <>
                  {' '}
                  <span className="upload__dropzone-hint-inline">{dropZoneText}</span>
                </>
              ) : null}
            </Text>

            {dropZoneHint ? (
              <Text size="small" type="tertiary" className="upload__dropzone-hint">
                {dropZoneHint}
              </Text>
            ) : null}
          </div>
        </div>
      ) : (
        <Button
          type="secondary"
          size="medium"
          className="upload__trigger"
          disabled={disabled || isMaxReached}
          iconProps={{ Component: IconAttach }}
          buttonText={buttonText}
          onClick={openFileDialog}
          dataId={dataId ? `${dataId}-btn` : undefined}
        />
      )}

      {files.length > 0 ? (
        filesLayout === 'carousel' ? (
          <ScrollableCarousel
            className="upload__list upload__list--carousel"
            prevAriaLabel={prevAriaLabel}
            nextAriaLabel={nextAriaLabel}
          >
            {files.map((file: TUploadFile) => (
              <AttachmentCard
                key={file.id}
                file={file}
                disabled={disabled}
                downloaded={downloadedSet?.has(file.id)}
                downloadedLabel={downloadedLabel}
                uploadFailedLabel={uploadFailedLabel}
                retryAriaLabel={retryAriaLabel}
                removeAriaLabel={removeAriaLabel}
                downloadAriaLabel={downloadAriaLabel}
                uploadingAriaLabel={uploadingAriaLabel}
                onRemove={onRemove}
                onDownload={onDownload}
                onRetry={onRetry}
                onClick={onFileClick}
              />
            ))}
          </ScrollableCarousel>
        ) : (
          <div className="upload__list upload__list--stack">
            {files.map((file: TUploadFile) => (
              <AttachmentCard
                key={file.id}
                file={file}
                fullWidth
                disabled={disabled}
                downloaded={downloadedSet?.has(file.id)}
                downloadedLabel={downloadedLabel}
                uploadFailedLabel={uploadFailedLabel}
                retryAriaLabel={retryAriaLabel}
                removeAriaLabel={removeAriaLabel}
                downloadAriaLabel={downloadAriaLabel}
                uploadingAriaLabel={uploadingAriaLabel}
                onRemove={onRemove}
                onDownload={onDownload}
                onRetry={onRetry}
                onClick={onFileClick}
              />
            ))}
          </div>
        )
      ) : null}

      {helperText && !hasError ? (
        <div className="upload__helper">
          <Text size="xsmall" type="tertiary">
            {helperText}
          </Text>
        </div>
      ) : null}

      {hasError && typeof helperText === 'string' ? (
        <ErrorMessage message={helperText} />
      ) : null}
    </div>
  )
}

export const Upload = memo(UploadComponent)

Upload.displayName = 'Upload'
