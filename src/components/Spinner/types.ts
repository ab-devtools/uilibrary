export type TSpinnerTypes = 'primary' | 'inverse' | 'brand-light'
export interface TSpinnerProps {
  mode?: 'light' | 'dark'
  type?: TSpinnerTypes
  size?: 'large' | 'medium' | 'small'
  title?: string
  text?: string
  className?: string
  isFullScreen?: boolean
}
