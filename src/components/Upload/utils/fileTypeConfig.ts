import IconDocument from '../../SVGIcons/IconDocument'
import IconDocumentText from '../../SVGIcons/IconDocumentText'
import IconDocumentBulletList from '../../SVGIcons/IconDocumentBulletList'
import IconImage from '../../SVGIcons/IconImage'
import IconVideo from '../../SVGIcons/IconVideo'
import IconAttach from '../../SVGIcons/IconAttach'
import type { TFileTypeConfig } from '../types'

const EXTENSION_MAP: Record<string, TFileTypeConfig> = {
  pdf: { Icon: IconDocumentText, color: 'danger', label: 'PDF' },
  doc: { Icon: IconDocumentText, color: 'info', label: 'DOC' },
  docx: { Icon: IconDocumentText, color: 'info', label: 'DOCX' },
  xls: { Icon: IconDocumentBulletList, color: 'success', label: 'XLS' },
  xlsx: { Icon: IconDocumentBulletList, color: 'success', label: 'XLSX' },
  csv: { Icon: IconDocumentBulletList, color: 'success', label: 'CSV' },
  ppt: { Icon: IconDocument, color: 'warning', label: 'PPT' },
  pptx: { Icon: IconDocument, color: 'warning', label: 'PPTX' },
  txt: { Icon: IconDocumentText, color: 'grey', label: 'TXT' },
  png: { Icon: IconImage, color: 'discovery', label: 'PNG' },
  jpg: { Icon: IconImage, color: 'discovery', label: 'JPG' },
  jpeg: { Icon: IconImage, color: 'discovery', label: 'JPEG' },
  gif: { Icon: IconImage, color: 'discovery', label: 'GIF' },
  webp: { Icon: IconImage, color: 'discovery', label: 'WEBP' },
  svg: { Icon: IconImage, color: 'discovery', label: 'SVG' },
  heic: { Icon: IconImage, color: 'discovery', label: 'HEIC' },
  mp4: { Icon: IconVideo, color: 'brand', label: 'MP4' },
  mov: { Icon: IconVideo, color: 'brand', label: 'MOV' },
  avi: { Icon: IconVideo, color: 'brand', label: 'AVI' },
  mkv: { Icon: IconVideo, color: 'brand', label: 'MKV' }
}

const DEFAULT_CONFIG: TFileTypeConfig = {
  Icon: IconAttach,
  color: 'grey',
  label: 'FILE'
}

export const getFileExtension = (name: string): string => {
  if (!name) return ''
  const idx = name.lastIndexOf('.')
  return idx >= 0 ? name.slice(idx + 1).toLowerCase() : ''
}

export const getFileTypeConfig = (name: string): TFileTypeConfig => {
  const ext = getFileExtension(name)
  return EXTENSION_MAP[ext] || DEFAULT_CONFIG
}
