import type { ReactElement } from 'react'
import React, { useCallback } from 'react'
import classnames from 'classnames'
import { Text } from '../../Text'
import { ButtonIcon } from '../../ButtonIcon'
import IconArrowDownload from '../../SVGIcons/IconArrowDownload'
import IconArrowSync from '../../SVGIcons/IconArrowSync'
import IconCheckmarkCircle from '../../SVGIcons/IconCheckmarkCircle'
import IconSpinner from '../../SVGIcons/IconSpinner'
import IconDismissCircle from '../../SVGIcons/IconDismissCircle'
import IconDelete from '../../SVGIcons/IconDelete'
import IconDismiss from '../../SVGIcons/IconDismiss'
import { getFileTypeConfig, formatFileSize } from '../utils'
import { UploadFileStatus } from '../types'
import type { TAttachmentCardProps } from '../types'

const clampProgress = (value: number): number => Math.max(0, Math.min(100, Math.round(value)))

export const AttachmentCard = (props: TAttachmentCardProps): ReactElement => {
  const {
    file,
    disabled,
    downloaded,
    downloadedLabel = 'Ներբեռնված',
    uploadFailedLabel = 'Ներբեռնումը ձախողվեց',
    retryAriaLabel = 'Կրկնել',
    removeAriaLabel = 'Հեռացնել',
    downloadAriaLabel = 'Ներբեռնել',
    uploadingAriaLabel = 'Ներբեռնվում է',
    fullWidth,
    onRemove,
    onDownload,
    onRetry,
    onClick
  } = props

  const { name, size, progress, status, errorMessage } = file
  const config = getFileTypeConfig(name)
  const IconComponent = config.Icon

  const hasProgress = typeof progress === 'number' && progress >= 0 && progress < 100
  const isUploading =
    status === UploadFileStatus.uploading || (hasProgress && status !== UploadFileStatus.error)
  const isError = status === UploadFileStatus.error

  const canRemove = !disabled && Boolean(onRemove)
  const canDownload = !isUploading && !isError && Boolean(onDownload)
  const canRetry = isError && !disabled && Boolean(onRetry)

  const handleRemove = useCallback(
    (event: TClickEventType) => {
      event.stopPropagation()
      onRemove?.(file)
    },
    [file, onRemove]
  )

  const handleDownload = useCallback(
    (event: TClickEventType) => {
      event.stopPropagation()
      onDownload?.(file)
    },
    [file, onDownload]
  )

  const handleRetry = useCallback(
    (event: TClickEventType) => {
      event.stopPropagation()
      onRetry?.(file)
    },
    [file, onRetry]
  )

  const handleClick = useCallback(() => {
    if (isUploading || isError || disabled) return
    onClick?.(file)
  }, [disabled, file, isError, isUploading, onClick])

  const progressValue = clampProgress(progress ?? 0)

  return (
    <div
      className={classnames('attachment-card', {
        'attachment-card--full-width': fullWidth,
        'attachment-card--disabled': disabled,
        'attachment-card--error': isError,
        'attachment-card--uploading': isUploading,
        'attachment-card--interactive': Boolean(onClick) && !disabled && !isUploading && !isError
      })}
      onClick={handleClick}
    >
      <div className={`attachment-card__icon attachment-card__icon--${config.color}`}>
        <IconComponent size="small" type="inverse" />
      </div>

      <div className="attachment-card__info">
        <Text size="small" weight="semibold" className="attachment-card__name" title={name}>
          {name}
        </Text>

        <div className="attachment-card__meta">
          {typeof size === 'number' && size > 0 ? (
            <Text size="xsmall" type="tertiary" className="attachment-card__size">
              {formatFileSize(size)}
            </Text>
          ) : null}

          {isUploading ? (
            <span
              className="attachment-card__progress"
              role="progressbar"
              aria-valuenow={progressValue}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span
                className="attachment-card__progress-fill"
                style={{ width: `${progressValue}%` }}
              />
            </span>
          ) : null}

          {isError ? (
            <span className="attachment-card__status">
              <IconDismissCircle size="xsmall" type="danger-light" />
              <Text size="xsmall" type="danger-light">
                {errorMessage || uploadFailedLabel}
              </Text>
            </span>
          ) : null}

          {!isError && !isUploading && downloaded ? (
            <span className="attachment-card__status">
              <IconCheckmarkCircle size="xsmall" type="brand-light" />
              <Text size="xsmall" type="brand-light">
                {downloadedLabel}
              </Text>
            </span>
          ) : null}
        </div>
      </div>

      <div className="attachment-card__actions">
        {isUploading ? (
          canRemove ? (
            <ButtonIcon
              size="medium"
              aria-label={removeAriaLabel}
              iconProps={{ Component: IconDismiss, type: 'tertiary' }}
              onClick={handleRemove}
            />
          ) : (
            <ButtonIcon
              size="medium"
              aria-label={uploadingAriaLabel}
              className="attachment-card__spinner"
              iconProps={{ Component: IconSpinner, type: 'tertiary' }}
            />
          )
        ) : (
          <>
            {canRetry ? (
              <ButtonIcon
                size="medium"
                aria-label={retryAriaLabel}
                iconProps={{ Component: IconArrowSync, type: 'tertiary' }}
                onClick={handleRetry}
              />
            ) : null}
            {canDownload ? (
              <ButtonIcon
                size="medium"
                aria-label={downloadAriaLabel}
                iconProps={{ Component: IconArrowDownload, type: 'tertiary' }}
                onClick={handleDownload}
              />
            ) : null}
            {canRemove ? (
              <ButtonIcon
                size="medium"
                aria-label={removeAriaLabel}
                iconProps={{ Component: IconDelete, type: 'tertiary' }}
                onClick={handleRemove}
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
