import type { IFormCompProps } from '../../types/globalTypes'

export interface TBadgeProps extends IFormCompProps {
  text?: number | string
  type?: 'red' | 'grey' | 'greyDark' | 'green' | 'transparent'
  size?: 'large' | 'small'
  className?: string
}
