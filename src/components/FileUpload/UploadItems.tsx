import type { JSX } from 'react'
import React from 'react'
import { Text } from '../Text'
import type { IUploadItemPropTypes } from './types'
import { useFormProps } from '../../hooks'
import { openFileInNewWindow } from '../../utils/helpers'
import { ErrorMessage } from '../../helperComponents/ErrorMessage'
import { Button } from '../Button'
import IconDelete from '../SVGIcons/IconDelete'

export const UploadItems = (props: IUploadItemPropTypes): JSX.Element => {
  const { files, onRemove, withFilePreview, handleFileClick } = props
  const { errors } = useFormProps()
  const filesErrors = errors && Array.isArray(errors.files) && errors.files.length > 0

  return (
    <>
      {files.map((file, index) => {
        return (
          <div
            className={`upload-item mt-4 ${
              filesErrors && Array.isArray(errors?.files) && errors.files[index]?.message
                ? 'upload-item--error'
                : ''
            }`}
            key={index}
          >
            <div className="upload-item__inner">
              <div className="upload-item__content">
                <div className="upload-item__content__inner pr-8">
                  <Text
                    size="small"
                    className="upload-item__text"
                    onClick={(e) =>
                      withFilePreview &&
                      openFileInNewWindow({
                        e,
                        file,
                        handleFileClick
                      })
                    }
                  >
                    {file.name}
                  </Text>
                  {filesErrors && (
                    <ErrorMessage
                      message={Array.isArray(errors?.files) ? errors.files[index]?.message : ''}
                    />
                  )}
                </div>
                <Button
                  type="tertiary"
                  size="small"
                  iconProps={{ Component: IconDelete }}
                  onClick={() => {
                    onRemove(file, index)
                  }}
                />
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
