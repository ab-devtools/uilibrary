export interface TAvatarProps extends IFormCompProps {
  imagePath?: string
  initials?: string | JSX.Element
  color?: 'default' | 'purple' | 'blue' | 'green' | 'red'
  size?: 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall' | 'xxsmall'
  className?: string
  isEditable?: boolean
  onAvatarChange?: (file: File) => void
}
