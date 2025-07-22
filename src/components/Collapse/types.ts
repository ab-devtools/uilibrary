import type { ReactElement, ReactNode } from 'react'

export type TCollapseProps = {
  isOpen: boolean
  toggle: () => void
  children: ReactNode
  title: string
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
  title: string
  subtext?: string
  additionalInfo?: ReactNode
  value: TCollapseValue
  content?: ReactElement | null
  iconProps?: TSelectIconProps
  isOpen?: boolean
  disabled?: boolean
  reverse?: boolean
  id?: string | number
}

export type TCollapseGroupProps = {
  items: TCollapseGroupItem[]
  singleSelection?: boolean
  className?: string
}
