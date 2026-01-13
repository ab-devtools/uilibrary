import type { ReactNode } from 'react'
import type { TSelectIconProps } from '../../types/globalTypes'

type TSubtitleProps = {
  subtitle?: string
  iconProps?: TSelectIconProps
}
export interface TCardItemProps {
  title?: string
  subtitleProps?: TSubtitleProps
  icon?: TSelectIconProps
  children?: ReactNode
  className?: string
  image?: string
  disabled?: boolean
}
