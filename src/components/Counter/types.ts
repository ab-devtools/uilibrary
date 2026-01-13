import type { IFormCompProps } from '../../types/globalTypes'

export interface ICounterProps extends IFormCompProps {
  min?: number
  max?: number
  handleChange?: (value: number | string | undefined) => void
  counter?: number
  customError?: string
  label?: string
  required?: boolean
}
