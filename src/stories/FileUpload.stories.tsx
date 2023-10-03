// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { FileUpload as FileUploadComp } from '../components'

export default {
  title: 'FileUpload',
  component: FileUploadComp
}

const getFiles = (files: FileList) => {
  console.log('getFiles', files)
}

const Template = (args): JSX.Element => {
  return (
    <div style={{ width: 400 }}>
      <FileUploadComp {...args} getFiles={getFiles} />
    </div>
  )
}
export const FileUpload = Template.bind({})

FileUpload.args = {
  label: 'Label',
  buttonText: 'Attach file',
  isFileUploaded: false,
  allowedTypes: ['PDF']
}
