import type { TSVGIconType } from '../SVGIcons/types'

export const TYPE_MAPPING: { [key: string]: TSVGIconType } = {
  warning: 'warning-light',
  success: 'success-light',
  error: 'danger-light',
  information: 'information-light',
  discovery: 'discovery-light',
  grey: 'disabled'
}

export const ICONS_MAPPING: { [key: string]: string } = {
  grey: 'infoFilled',
  warning: 'warningFilled',
  success: 'checkmarkCircleFilled',
  error: 'errorCircleFilled',
  information: 'infoFilled',
  discovery: 'infoFilled'
}
