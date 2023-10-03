import React, { ReactElement, useState } from 'react'
import { TAvatarProps } from './types'
import classNames from 'classnames'
import { FileUpload } from '../index'
import { FileUploadMode } from '../FileUpload/types'
import '../../assets/styles/components/_avatar.scss'

export const Avatar = ({
  color = 'default',
  size = 'medium',
  imagePath = '',
  initials = '',
  className = '',
  isEditable = false,
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
    ...(image ? { backgroundImage: image ? `url(${image})` : 'none' } : null)
  }

  return (
    <div
      className={classNames('avatar', `avatar--${color}`, `avatar--${size}`, className, {
        'avatar--image': image,
        'avatar--edit': isEditable
      })}
      style={style}
    >
      {!image ? initials : null}
      {isEditable && (
        <FileUpload
          multiple={false}
          withFilePreview={false}
          getFiles={getFiles}
          allowedTypes=".png, .jpg, .jpeg"
          mode={FileUploadMode.edit}
        />
      )}
    </div>
  )
}

export default Avatar
