import type { ReactElement, ReactNode } from 'react'
import type { TSelectIconProps } from '../../types/globalTypes'

export type TCollapseProps = {
  isOpen: boolean
  toggle: () => void
  children: ReactNode
  title: string | ReactElement
  subtext?: string
  additionalInfo?: ReactNode
  iconProps?: TSelectIconProps
  reverse?: boolean
  disabled?: boolean
  id?: string | number
  className?: string
}

export type TCollapseValue = string | number

export type TCollapseGroupItem = {
  title: string | ReactElement
  subtext?: string
  additionalInfo?: ReactNode
  value: TCollapseValue
  content?: ReactElement | null
  iconProps?: TSelectIconProps
  isOpen?: boolean
  disabled?: boolean
  reverse?: boolean
  id?: string | number
  isHidden?: boolean
}

export type TCollapseGroupProps = {
  items: TCollapseGroupItem[]
  singleSelection?: boolean
  className?: string
}
