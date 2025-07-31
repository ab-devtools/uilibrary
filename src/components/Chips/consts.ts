import type { TSVGIconSize, TTextSize } from '../SVGIcons/types'
import type { TTextTypes } from '../Text/types'

export const RIGHT_ICON_SIZE_MAPPING: { [key: string]: TSVGIconSize } = {
  large: 'small',
  medium: 'small',
  small: 'small',
  xsmall: 'xsmall'
}

export const LEFT_ICON_SIZE_MAPPING: { [key: string]: TSVGIconSize } = {
  large: 'medium',
  medium: 'small',
  small: 'small',
  xsmall: 'xsmall'
}

export const TEXT_SIZE_MAPPING: { [key: string]: TTextSize } = {
  large: 'standard',
  medium: 'standard',
  small: 'standard',
  xsmall: 'small'
}
export const COLOR_MAPPING: { [key: string]: TTextTypes } = {
  primary: 'primary',
  disabled: 'disabled',
  brand: 'brand-light',
  danger: 'danger-light',
  warning: 'warning-light',
  success: 'success-light',
  information: 'information-light',
  discovery: 'discovery-light'
}
