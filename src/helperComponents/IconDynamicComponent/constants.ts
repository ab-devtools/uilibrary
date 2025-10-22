/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy } from 'react'

export const IconComponentMapping: { [key: string]: any } = {
  warningFilled: lazy((): any => import('../../components/SVGIcons/IconWarningFilled')),
  checkmarkCircleFilled: lazy(
    (): any => import('../../components/SVGIcons/IconCheckmarkCircleFilled')
  ),
  errorCircleFilled: lazy((): any => import('../../components/SVGIcons/IconErrorCircleFilled')),
  wifiOff: lazy((): any => import('../../components/SVGIcons/IconWifiOff')),
  infoFilled: lazy((): any => import('../../components/SVGIcons/IconInfoFilled')),
  checkmark: lazy((): any => import('../../components/SVGIcons/IconCheckmark')),
  subtract: lazy((): any => import('../../components/SVGIcons/IconSubtract')),
  am: lazy((): any => import('../../components/SVGIcons/IconAm')),
  ru: lazy((): any => import('../../components/SVGIcons/IconRu')),
  us: lazy((): any => import('../../components/SVGIcons/IconGb'))
}
