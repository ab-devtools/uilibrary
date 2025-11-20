import type { TSVGIconSize, TSVGIconType } from '../SVGIcons/types'

export const LITE_LOADER_TYPES = ['primary', 'danger']

export const ICON_SIZE_MAPPING: { [key: string]: TSVGIconSize } = {
  large: 'small',
  medium: 'small',
  small: 'xsmall'
}

export const ICON_TYPE_MAPPING: { [key: string]: TSVGIconType } = {
  primary: 'inverse',
  secondary: 'primary',
  tertiary: 'primary',
  danger: 'inverse',
  text: 'primary'
}
