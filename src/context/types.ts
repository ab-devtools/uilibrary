import { createContext } from 'react'
import type {
  Control,
  FieldValues,
  FieldErrors,
  UseFormRegister,
  UseFormGetValues,
  UseFormWatch,
  UseFormReset,
  UseFormClearErrors,
  UseFormSetError,
  UseFormTrigger,
  UseFormGetFieldState,
  UseFormUnregister
} from 'react-hook-form'
import { noop } from '../utils/helpers'
import type { TDirtyFields, TFormData, TSetValue } from '../types/globalTypes'

export type TFormContextProps = {
  register?: UseFormRegister<TFormData>
  errors?: FieldErrors
  setValue: TSetValue
  control?: Control<FieldValues, unknown>
  getValues?: UseFormGetValues<TFormData>
  watch?: UseFormWatch<TFormData>
  reset?: UseFormReset<TFormData>
  isDirty?: boolean
  clearErrors?: UseFormClearErrors<TFormData>
  setError?: UseFormSetError<TFormData>
  isSubmitted: boolean
  isSubmitting: boolean
  dirtyFields: TDirtyFields
  trigger?: UseFormTrigger<TFormData>
  getFieldState?: UseFormGetFieldState<TFormData>
  unregister?: UseFormUnregister<TFormData>
  isValid: boolean
}

export const FormContext = createContext<TFormContextProps>({
  setValue: noop,
  isSubmitted: false,
  isSubmitting: false,
  dirtyFields: {},
  isValid: false
})
