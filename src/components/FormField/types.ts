import type { JSX } from 'react'
import type { IFormCompProps } from '../../types/globalTypes'

export interface TFormFieldPropTypes {
  As: (props: IFormCompProps) => JSX.Element
  name: string
  className?: string
  dataId?: string
  hideErrorMessage?: boolean
  errorMessageIcon?: string
}
