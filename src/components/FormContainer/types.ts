import type { ReactNode } from 'react'
import type { FormState } from 'react-hook-form'
import type { AnyObjectSchema, ValidateOptions } from 'yup'
import type { ValidationMode } from 'react-hook-form/dist/types/form'
import type { TButtonPropTypes } from '../Button/types'

export type TDirtyFields = Partial<Readonly<{ [x: string]: unknown }>>

export interface FormPropTypes {
  className?: string
  onSubmit?: (data: TFormData, formState: FormState<TFormData>, dirtyFields?: TDirtyFields) => void
  children?: ReactNode
  validationScheme: AnyObjectSchema
  validationSchemeOptions?:  ValidateOptions<string | number> | undefined
  initialValues: TFormData
  buttonConfigs?: TButtonPropTypes[]
  shouldUnregister?: boolean
  shouldFocusError?: boolean
  mode?: keyof ValidationMode
  reValidateMode?: 'onChange' | 'onSubmit' | 'onBlur' | undefined
  formId?: string
}
