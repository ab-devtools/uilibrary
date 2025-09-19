import type { JSX } from 'react'
import React from 'react'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import { FormContext } from '../../context'
import type { FormPropTypes } from './types'
import { Button } from '../Button'
import * as yup from 'yup'

export const FormContainer = (props: FormPropTypes): JSX.Element => {
  const {
    children,
    className = '',
    shouldUnregister,
    shouldFocusError = true,
    mode = 'onBlur',
    initialValues,
    validationScheme,
    validationContext,
    buttonConfigs,
    formId,
    onSubmit
  } = props

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState,
    getValues,
    watch,
    reset,
    clearErrors,
    setError,
    trigger,
    getFieldState,
    unregister
  } = useForm({
    mode: mode,
    context: validationContext,
    defaultValues: initialValues,

    shouldFocusError: shouldFocusError,
    shouldUnregister: shouldUnregister
  })

  const { errors, isDirty, isSubmitted, isSubmitting, dirtyFields } = formState

  const customSubmit = async (data: TFormData) => {
    try {
      if (validationScheme) {
        await validationScheme.validate(data, { abortEarly: false })
      }
      
      if (onSubmit) {
        onSubmit(data, formState, dirtyFields)
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((err) => {
          setError(err.path as string, {
            type: 'manual',
            message: err.message
          })
        })
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(customSubmit)}
      id={formId}
      className={classnames('form-container', className)}
    >
      <FormContext.Provider
        value={{
          trigger,
          register,
          errors,
          control,
          setValue,
          getValues,
          watch,
          reset,
          isDirty,
          isSubmitted,
          isSubmitting,
          clearErrors,
          setError,
          dirtyFields,
          getFieldState,
          unregister
        }}
      >
        <>
          {children}
          {buttonConfigs && (
            <div className="form-container__buttons">
              {buttonConfigs.map((buttonConfig, index) => {
                return <Button {...buttonConfig} key={index} />
              })}
            </div>
          )}
        </>
      </FormContext.Provider>
    </form>
  )
}
