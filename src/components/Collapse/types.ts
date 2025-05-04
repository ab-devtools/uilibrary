import type { ReactElement, ReactNode } from 'react'


export type TCollapseProps = {
  isOpen: boolean
  toggle: () => void
  children: ReactNode
  title: string
  reverse?: boolean
  additionalInfo?: ReactNode
  subtext?: string
  iconProps?: TSelectIconProps
  id?: string | number
  className?: string
}

export type TCollapseValue = string | number

export type TCollapseItem = {
  title: string
  value: TCollapseValue
  content?: ReactElement | null
  iconProps?: TSelectIconProps
  isOpen?: boolean
  id?: string | number
}

export type TCollapseGroupProps = {
  items: TCollapseItem[]
  singleSelection?: boolean
  className?: string
}
