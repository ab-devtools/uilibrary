import { useContext } from 'react'
import { FormContext } from '../context'
import type { Control, FieldValues, FieldErrors, UseFormRegister } from 'react-hook-form'
import type { TFormData, TSetValue } from '../types/globalTypes'

type TFormContextProps = {
  register?: UseFormRegister<TFormData> //TRegister | CallbackFnType
  errors?: FieldErrors
  setValue: TSetValue
  control?: Control<FieldValues, unknown>
}

export const useFormContext = (): TFormContextProps => {
  return useContext(FormContext)
}
