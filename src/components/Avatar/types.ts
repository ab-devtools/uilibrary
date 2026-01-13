import type { ReactElement } from 'react'
import type { FILE_UPLOAD_ERRORS } from '../../consts'
import type { TSVGIconType } from '../SVGIcons/types'
import type { IFormCompProps, TSVGIconComponent } from '../../types/globalTypes'

export interface TAvatarProps extends IFormCompProps {
  allowedTypes?: string
  id?: string
  dataId?: string
  imagePath?: string
  iconProps?: {
    Component: TSVGIconComponent
    type?: TSVGIconType
  }
  initials?: string | ReactElement
  color?: 'grey' | 'orange' | 'purple' | 'blue' | 'green' | 'red'
  type?: 'count'
  size?: 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall' | 'xxsmall'
  className?: string
  isEditable?: boolean
  onAvatarChange?: (file: File) => void
  tooltipContent?: string | ReactElement
  onError?: (type: FILE_UPLOAD_ERRORS) => void
  fileAllowedSize?: number
}

export interface TAvatarGroupProps {
  dataId?: string
  avatarGroup: TAvatarProps[]
  onAddUser?: () => void
  maxCount?: 0 | 2 | 4 | 6
  size?: 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall' | 'xxsmall'
}
