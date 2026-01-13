import type { JSX } from 'react'
import React, { useCallback, useRef, useState } from 'react'
import type { TFileUploadProps } from './types'
import { FileUploadMode } from './types'
import { Button } from '../Button'
import { Label } from '../../helperComponents/Label'
import { UploadItems } from './UploadItems'
import { FILE_UPLOAD_ERRORS } from '../../consts'
import {
  checkIsAllowedFileSize,
  getFormattedValues,
  checkIsAllowedTypes,
  uniqueFiles
} from '../../utils/helpers'
import IconEditFilled from '../SVGIcons/IconEditFilled'
import IconEdit from '../SVGIcons/IconEdit'
import IconAttach from '../SVGIcons/IconAttach'
import type { TFormValue } from '../../types/globalTypes'

export const FileUpload = (props: TFileUploadProps): JSX.Element | null => {
  const {
    allowedTypes = 'application/pdf, .png, .jpg, .jpeg, image/jpeg, image/png, image/jpg, text/plain, image/*, .pdf, .doc, .docx, application/vnd',
    label,
    getFiles,
    removeFiles,
    handleFileClick,
    name,
    setFieldValue,
    toBase64,
    required,
    disabled,
    buttonText,
    withFilePreview = true,
    multiple = true,
    uploadedFiles,
    value,
    labelAddons,
    onError,
    fileAllowedSize,
    mode = FileUploadMode.attach,
    dataId
  } = props
  const files = (value as File[]) || uploadedFiles || []
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isHovered, setHoverState] = useState(false)

  const onMouseEnterOrLeave = () => setHoverState(!isHovered)

  const onUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const updateInForm = useCallback(
    (values: File[] | FileReader[] | null) => {
      if (name && setFieldValue) {
        setFieldValue(name, values as TFormValue)
      }
    },
    [name, setFieldValue]
  )

  const setFiles = (selectedFiles: File[]) => {
    const allowedFilesBySize = selectedFiles.filter((file) => {
      return !(fileAllowedSize && !checkIsAllowedFileSize(fileAllowedSize, file.size))
    })
    const allowedFilesByExtension = selectedFiles.filter((file) => {
      return !(allowedTypes && !checkIsAllowedTypes(allowedTypes, file.type))
    })

    if (allowedFilesByExtension.length !== selectedFiles.length) {
      onError && onError(FILE_UPLOAD_ERRORS.type)
      return
    }
    if (allowedFilesBySize.length !== selectedFiles.length) {
      onError && onError(FILE_UPLOAD_ERRORS.size)
      return
    }
    updateInForm(toBase64 ? getFormattedValues(selectedFiles) : selectedFiles)

    if (getFiles) {
      getFiles(selectedFiles)
    }
  }

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target?.files as FileList
      const fileArray = multiple ? Array.from(fileList) : [fileList[0]]

      if (fileArray) {
        const updatedFiles = uniqueFiles(multiple ? [...fileArray, ...files] : fileArray)
        setFiles(updatedFiles)
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    },
    [files, multiple]
  )

  const handleFileRemove = useCallback(
    (file: File, index: number) => {
      if (files) {
        const filteredFiles = files.filter((_, i) => i !== index)
        updateInForm(filteredFiles)
        if (removeFiles) {
          removeFiles(file)
        }
      }
    },
    [files, removeFiles]
  )

  return (
    <div className="file-upload">
      <Label text={label} required={required} disabled={disabled} labelAddons={labelAddons} />
      <div className="file-upload__inner">
        <input
          name={name}
          type="file"
          multiple={multiple}
          className="hide"
          ref={fileInputRef}
          accept={allowedTypes}
          onChange={handleChange}
          data-id={dataId ? `${dataId}-input` : ''}
        />
        {mode === FileUploadMode.edit && (
          <div
            className="edit__icon"
            onMouseEnter={onMouseEnterOrLeave}
            onMouseLeave={onMouseEnterOrLeave}
            onClick={onUploadClick}
          >
            {isHovered ? (
              <IconEditFilled size="xxsmall" type="secondary" />
            ) : (
              <IconEdit size="xxsmall" type="secondary" />
            )}
          </div>
        )}
        {mode === FileUploadMode.attach && (
          <Button
            type="secondary"
            size="medium"
            disabled={disabled}
            iconProps={{ Component: IconAttach }}
            onClick={onUploadClick}
            buttonText={buttonText}
            data-id={dataId ? `${dataId}-btn` : ''}
          />
        )}

        <UploadItems
          handleFileClick={handleFileClick}
          onRemove={handleFileRemove}
          files={files}
          withFilePreview={withFilePreview}
        />
      </div>
    </div>
  )
}
