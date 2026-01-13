/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LegacyRef, MouseEvent } from 'react'
import type { TTooltipProps } from '../Tooltip/types'
import type { TSVGIconComponent } from '../../types/globalTypes'

export type TSVGIconSize =
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge'

export type TSVGIconType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'disabled'
  | 'inverse'
  | 'brand-light'
  | 'brand-dark'
  | 'danger-light'
  | 'danger-dark'
  | 'warning-light'
  | 'warning-dark'
  | 'success-light'
  | 'success-dark'
  | 'information-light'
  | 'information-dark'
  | 'discovery-light'
  | 'discovery-dark'

export interface ISVGIconProps {
  size?: TSVGIconSize
  type?: TSVGIconType
  onClick?: (event: MouseEvent<any>) => void
  onMouseDown?: (event: MouseEvent<any>) => void
  className?: string
  refHandler?: LegacyRef<SVGSVGElement> | undefined
  id?: string
  dataId?: string
  Component?: TSVGIconComponent
  tooltipAddons?: TTooltipProps
}

export type TTextSize = 'xxsmall' | 'xsmall' | 'small' | 'standard' | 'medium' | 'large'

export type TTextTypes =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'disabled'
  | 'inverse'
  | 'brand-light'
  | 'brand-dark'
  | 'danger-light'
  | 'danger-dark'
  | 'warning-light'
  | 'warning-dark'
  | 'success-light'
  | 'success-dark'
  | 'information-light'
  | 'information-dark'
  | 'discovery-light'
  | 'discovery-dark'
