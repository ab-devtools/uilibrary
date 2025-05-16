import type { TSVGIconSize, TTextSize } from '../SVGIcons/types'

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
