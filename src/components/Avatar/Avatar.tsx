import type { ReactElement } from 'react'
import React, { useEffect, useState } from 'react'
import type { TAvatarProps } from './types'
import classNames from 'classnames'
import { FileUpload, FileUploadMode } from '../FileUpload'
import { ICON_SIZE_MAPPING, ICON_TYPE_MAPPING } from './consts'
import IconPerson from '../SVGIcons/IconPerson'

export const Avatar = ({
  dataId,
  id,
  color = 'orange',
  size = 'medium',
  type,
  imagePath = '',
  initials = '',
  className = '',
  iconProps,
  isEditable = false,
  allowedTypes = '.png, .jpg, .jpeg, image/jpeg, image/png, image/jpg',
  onError,
  fileAllowedSize,
  onAvatarChange
}: TAvatarProps): ReactElement => {
  const [image, setImage] = useState<string>(imagePath)
  const getFiles = (files: File[]) => {
    if (files && files[0]) {
      setImage(URL.createObjectURL(files[0]))
      onAvatarChange?.(files[0])
    }
  }
  const style = {
    backgroundImage: image ? `url(${image})` : 'none'
  }

  useEffect(() => {
    setImage(imagePath)
  }, [imagePath])

  return (
    <div
      id={id}
      data-id={dataId}
      className={classNames(`avatar avatar--${color} avatar--${type} avatar--${size}`, className, {
        'avatar--image': image,
        'avatar--edit': isEditable
      })}
      style={style}
    >
      {!image ? (
        iconProps?.Component ? (
          <iconProps.Component size={ICON_SIZE_MAPPING[size]} type={ICON_TYPE_MAPPING[color]} />
        ) : (
          initials
        )
      ) : null}
      {isEditable && (
        <FileUpload
          onError={onError}
          fileAllowedSize={fileAllowedSize}
          multiple={false}
          withFilePreview={false}
          getFiles={getFiles}
          allowedTypes={allowedTypes}
          mode={FileUploadMode.edit}
        />
      )}
    </div>
  )
}
