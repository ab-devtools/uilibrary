import type { JSX } from 'react'
import type { IFormCompProps } from '../../types/globalTypes'

export type TBreadCrumbItem = {
  value: number | string
  label: string | JSX.Element
  onClick: () => void
}
export interface TBreadCrumbProps extends IFormCompProps {
  breadCrumbItems: TBreadCrumbItem[]
  className?: string
  selectedValue: number | string
  onSelect: (value: string | number) => void
}
