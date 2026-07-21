import React, { JSX, useCallback, useMemo, useRef, useState } from 'react'
import type { StoryFn } from '@storybook/react'
import {
  AttachmentCard,
  ScrollableCarousel,
  Upload as _Upload
} from '../components/Upload'
import type {
  TUploadError,
  TUploadFile,
  TUploadProps
} from '../components/Upload'
import { UploadFileStatus, generateFileId } from '../components/Upload'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { ButtonIcon } from '../components/ButtonIcon'
import IconInfo from '../components/SVGIcons/IconInfo'
import IconAttach from '../components/SVGIcons/IconAttach'
import IconSend from '../components/SVGIcons/IconSend'

export default {
  title: 'Upload',
  component: _Upload,
  parameters: {
    docs: {
      description: {
        component:
          'File upload component with drag and drop, validation, progress state, and a horizontal scrollable carousel that displays uploaded files.'
      }
    }
  },
  argTypes: {
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    withDropZone: { control: 'boolean' },
    dropzoneSize: {
      control: { type: 'inline-radio' },
      options: ['default', 'small']
    },
    filesLayout: {
      control: { type: 'inline-radio' },
      options: ['list', 'carousel']
    }
  }
}

const fromNativeFile = (file: File): TUploadFile => ({
  id: generateFileId(file),
  name: file.name,
  size: file.size,
  type: file.type,
  file,
  progress: 0,
  status: UploadFileStatus.uploading
})

const trackFileProgress = (
  id: string,
  file: File,
  setFiles: React.Dispatch<React.SetStateAction<TUploadFile[]>>
): void => {
  const reader = new FileReader()

  reader.onprogress = (event: ProgressEvent<FileReader>): void => {
    if (!event.lengthComputable) return
    const percent = Math.round((event.loaded / event.total) * 100)
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, progress: percent, status: UploadFileStatus.uploading } : f
      )
    )
  }

  reader.onload = (): void => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, progress: 100, status: UploadFileStatus.success } : f
      )
    )
  }

  reader.onerror = (): void => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, status: UploadFileStatus.error, errorMessage: 'Ներբեռնումը ձախողվեց' }
          : f
      )
    )
  }

  reader.readAsArrayBuffer(file)
}

const Template: StoryFn<TUploadProps> = (args) => {
  const [files, setFiles] = useState<TUploadFile[]>([])

  const handleAdd = useCallback((nativeFiles: File[]) => {
    const enriched = nativeFiles.map(fromNativeFile)
    setFiles((prev) => [...prev, ...enriched])
    enriched.forEach((entry) => {
      if (entry.file) trackFileProgress(entry.id, entry.file, setFiles)
    })
  }, [])

  const handleRemove = useCallback((file: TUploadFile) => {
    setFiles((prev) => prev.filter((f) => f.id !== file.id))
  }, [])

  const handleError = useCallback((error: TUploadError) => {
    console.warn('Upload error:', error)
  }, [])

  return (
    <div style={{ width: 560, padding: 20 }}>
      <_Upload
        {...args}
        files={files}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onError={handleError}
      />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  label: 'uploads',
  browseText: 'Ներբեռնեք ֆայլը',
  dropZoneText: 'կամ տեղափոխեք այստեղ',
  dropZoneHint: 'JPEG, PNG, PDF, DOC և MP4 ձևաչափեր՝ մինչև 50 ՄԲ',
  multiple: true,
  withDropZone: true,
  fileAllowedSize: 50 * 1024 * 1024,
  labelAddons: <IconInfo size="xsmall" type="information-light" className="ml-4" />
}

export const Small = Template.bind({})
Small.args = {
  ...Default.args,
  dropzoneSize: 'small'
}

export const ButtonOnly = Template.bind({})
ButtonOnly.args = {
  label: 'Կցել փաստաթղթեր',
  buttonText: 'Կցել ֆայլ',
  helperText: 'Կոմպակտ տարբերակ առանց տեղափոխման դաշտի։',
  withDropZone: false,
  multiple: true
}

export const SingleFile = Template.bind({})
SingleFile.args = {
  label: 'Պրոֆիլի նկար',
  browseText: 'Ներբեռնեք նկարը',
  dropZoneText: 'կամ տեղափոխեք այստեղ',
  dropZoneHint: 'PNG կամ JPG՝ մինչև 10 ՄԲ',
  allowedTypes: 'image/png, image/jpeg',
  multiple: false,
  withDropZone: true
}

export const WithMaxFiles = Template.bind({})
WithMaxFiles.args = {
  label: 'Փաստաթղթեր (առավելագույնը 3 ֆայլ)',
  browseText: 'Ներբեռնեք ֆայլը',
  dropZoneText: 'կամ տեղափոխեք այստեղ',
  dropZoneHint: 'Մինչև 3 ֆայլ',
  helperText: 'Կարող եք ներբեռնել մինչև 3 ֆայլ։',
  maxFiles: 3,
  multiple: true,
  withDropZone: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'uploads',
  browseText: 'Ներբեռնեք ֆայլը',
  dropZoneText: 'կամ տեղափոխեք այստեղ',
  dropZoneHint: 'Ներբեռնումն անջատված է',
  disabled: true,
  withDropZone: true
}

const PRESET_FILES: TUploadFile[] = [
  {
    id: 'preset-1',
    name: 'Business loan application-agreement.pdf',
    size: 135 * 1024 * 1024,
    progress: 60,
    status: UploadFileStatus.uploading
  },
  {
    id: 'preset-2',
    name: 'Business loan application-agreement.xls',
    size: 135 * 1024 * 1024,
    progress: 45,
    status: UploadFileStatus.uploading
  },
  {
    id: 'preset-3',
    name: 'Business loan application-agreement.doc',
    size: 135 * 1024 * 1024,
    status: UploadFileStatus.error,
    errorMessage: 'Ներբեռնումը ձախողվեց'
  },
  {
    id: 'preset-4',
    name: 'Business loan application-agreement.pdf',
    size: 135 * 1024 * 1024,
    status: UploadFileStatus.success
  },
  {
    id: 'preset-5',
    name: 'Business loan application-agreement.xls',
    size: 135 * 1024 * 1024,
    status: UploadFileStatus.success
  },
  {
    id: 'preset-6',
    name: 'Business loan application-agreement.pdf',
    size: 135 * 1024 * 1024,
    status: UploadFileStatus.success
  },
  {
    id: 'preset-7',
    name: 'Business loan application-agreement.doc',
    size: 135 * 1024 * 1024,
    status: UploadFileStatus.success
  },
  {
    id: 'preset-8',
    name: 'Business loan application-agreement.pdf',
    size: 135 * 1024 * 1024,
    status: UploadFileStatus.success
  }
]

const PresetTemplate: StoryFn<TUploadProps> = (args) => {
  const [files, setFiles] = useState<TUploadFile[]>(PRESET_FILES)
  const downloadedIds = useMemo(
    () => new Set<string>(['preset-4', 'preset-5', 'preset-6', 'preset-7', 'preset-8']),
    []
  )

  const handleAdd = useCallback((nativeFiles: File[]) => {
    const enriched = nativeFiles.map(fromNativeFile)
    setFiles((prev) => [...prev, ...enriched])
    enriched.forEach((entry) => {
      if (entry.file) trackFileProgress(entry.id, entry.file, setFiles)
    })
  }, [])

  const handleRemove = useCallback((file: TUploadFile) => {
    setFiles((prev) => prev.filter((f) => f.id !== file.id))
  }, [])

  const handleDownload = useCallback((file: TUploadFile) => {
    console.log('Download:', file.name)
  }, [])

  const handleRetry = useCallback((file: TUploadFile) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === file.id
          ? { ...f, status: UploadFileStatus.uploading, progress: 10, errorMessage: undefined }
          : f
      )
    )
  }, [])

  return (
    <div style={{ width: 560, padding: 20 }}>
      <_Upload
        {...args}
        files={files}
        downloadedIds={downloadedIds}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onDownload={handleDownload}
        onRetry={handleRetry}
      />
    </div>
  )
}

export const WithPresetFiles = PresetTemplate.bind({})
WithPresetFiles.args = {
  browseText: 'Ներբեռնեք ֆայլը',
  dropZoneText: 'կամ տեղափոխեք այստեղ',
  dropZoneHint: 'JPEG, PNG, PDF, DOC և MP4 ձևաչափեր՝ մինչև 50 ՄԲ',
  downloadedLabel: 'Ներբեռնված',
  multiple: true,
  withDropZone: true,
  filesLayout: 'list'
}

export const WithPresetFilesCarousel = PresetTemplate.bind({})
WithPresetFilesCarousel.args = {
  ...WithPresetFiles.args,
  filesLayout: 'carousel'
}

export const WithUploadProgress = (args: TUploadProps): JSX.Element => {
  const [files, setFiles] = useState<TUploadFile[]>([])

  const handleAdd = useCallback((nativeFiles: File[]) => {
    const enriched = nativeFiles.map((file) => ({
      ...fromNativeFile(file),
      status: UploadFileStatus.uploading,
      progress: 20
    }))

    setFiles((prev) => [...prev, ...enriched])

    enriched.forEach((entry) => {
      let progress = 20
      const interval = setInterval(() => {
        progress += 20
        setFiles((prev) =>
          prev.map((f) =>
            f.id === entry.id
              ? {
                  ...f,
                  progress,
                  status: progress >= 100 ? UploadFileStatus.success : UploadFileStatus.uploading
                }
              : f
          )
        )
        if (progress >= 100) clearInterval(interval)
      }, 500)
    })
  }, [])

  const handleRemove = useCallback((file: TUploadFile) => {
    setFiles((prev) => prev.filter((f) => f.id !== file.id))
  }, [])

  return (
    <div style={{ width: 560, padding: 20 }}>
      <_Upload {...args} files={files} onAdd={handleAdd} onRemove={handleRemove} />
    </div>
  )
}
WithUploadProgress.args = {
  label: 'uploads (մոդելավորված ընթացք)',
  browseText: 'Ներբեռնեք ֆայլը',
  dropZoneText: 'կամ տեղափոխեք այստեղ՝ ներբեռնումը սկսելու համար',
  multiple: true,
  withDropZone: true
}

export const WithErrorState = (args: TUploadProps): JSX.Element => {
  const [files] = useState<TUploadFile[]>([
    {
      id: 'ok-1',
      name: 'valid-document.pdf',
      size: 1.2 * 1024 * 1024,
      status: UploadFileStatus.success
    },
    {
      id: 'err-1',
      name: 'too-large-video.mp4',
      size: 120 * 1024 * 1024,
      status: UploadFileStatus.error,
      errorMessage: 'Ֆայլը գերազանցում է թույլատրելի չափը'
    }
  ])

  return (
    <div style={{ width: 560, padding: 20 }}>
      <_Upload {...args} files={files} />
    </div>
  )
}
WithErrorState.args = {
  label: 'uploads',
  browseText: 'Ներբեռնեք ֆայլը',
  dropZoneText: 'կամ տեղափոխեք այստեղ',
  withDropZone: true
}

const COMPOSER_PRESET_FILES: TUploadFile[] = [
  {
    id: 'composer-1',
    name: 'Business loan application-agreement.pdf',
    size: 135 * 1024 * 1024,
    progress: 60,
    status: UploadFileStatus.uploading
  },
  {
    id: 'composer-2',
    name: 'Business loan application-agreement.doc',
    size: 135 * 1024 * 1024,
    status: UploadFileStatus.success
  },
  {
    id: 'composer-3',
    name: 'Business loan application-agreement.xls',
    size: 135 * 1024 * 1024,
    status: UploadFileStatus.success
  }
]

export const ChatComposer = (): JSX.Element => {
  const [message, setMessage] = useState('')
  const [files, setFiles] = useState<TUploadFile[]>(COMPOSER_PRESET_FILES)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const downloadedIds = useMemo(
    () => new Set<string>(['composer-2', 'composer-3']),
    []
  )

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFilesChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return
      const enriched = Array.from(event.target.files).map(fromNativeFile)
      setFiles((prev) => [...prev, ...enriched])
      enriched.forEach((entry) => {
        if (entry.file) trackFileProgress(entry.id, entry.file, setFiles)
      })
      event.target.value = ''
    },
    []
  )

  const handleRemove = useCallback((file: TUploadFile) => {
    setFiles((prev) => prev.filter((f) => f.id !== file.id))
  }, [])

  const handleSend = useCallback(() => {
    if (!message.trim() && files.length === 0) return
    setMessage('')
    setFiles([])
  }, [message, files.length])

  const canSend = message.trim().length > 0 || files.length > 0

  return (
    <div style={{ width: 900, padding: 20 }}>
      <h4 style={{ margin: '0 0 16px', fontWeight: 700 }}>Default position</h4>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <Input
            size="large"
            placeholder="Թողեք մեկնաբանություն հայտի վերաբերյալ"
            currentValue={message}
            handleChange={(_, value) => setMessage(value)}
          />
        </div>

        <ButtonIcon
          size="medium"
          aria-label="Կցել ֆայլ"
          iconProps={{ Component: IconAttach, type: 'tertiary' }}
          onClick={openFileDialog}
        />

        <Button
          type="primary"
          size="medium"
          disabled={!canSend}
          iconProps={{ Component: IconSend, type: 'primary' }}
          aria-label="Ուղարկել"
          onClick={handleSend}
        />

        <input
          ref={fileInputRef}
          type="file"
          multiple
          style={{ display: 'none' }}
          onChange={handleFilesChange}
        />
      </div>

      {files.length > 0 ? (
        <div style={{ marginTop: 12 }}>
          <ScrollableCarousel prevAriaLabel="Նախորդ" nextAriaLabel="Հաջորդ">
            {files.map((file) => (
              <AttachmentCard
                key={file.id}
                file={file}
                downloaded={downloadedIds.has(file.id)}
                onRemove={handleRemove}
              />
            ))}
          </ScrollableCarousel>
        </div>
      ) : null}
    </div>
  )
}
