import type { JSX, KeyboardEvent } from 'react'
import { useCallback } from 'react'
import React, { useState, useRef } from 'react'
import classNames from 'classnames'
import { Input } from '../Input'
import type { OtpCustomProps } from './types'
import { ErrorMessage, Label } from '../../helperComponents'
import { Text } from '../Text'
import IconCheckmarkCircleFilled from '../SVGIcons/IconCheckmarkCircleFilled'
import type { TChangeEventType } from '../../types/globalTypes'

export const OneTimePassword = React.forwardRef<HTMLInputElement, OtpCustomProps>(
  ({
    className,
    size = 'large',
    error,
    hasError,
    label,
    name,
    disabled,
    required,
    placeholder,
    type,
    pattern,
    setFieldValue,
    handleChange,
    dataId = '',
    isValid,
    count,
    successMessage,
    autoFocus,
    allowLetters = false,
    ...rest
  }): JSX.Element => {
    const isErrorVisible = hasError !== undefined ? hasError : !!error
    const [otp, setOtp] = useState<string[]>(Array(count).fill(''))
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const onChange = (e: TChangeEventType, value: string, index: number) => {
      if (
        (allowLetters && value.length === 1) ||
        ((!Number.isNaN(Number(value)) || value === '0') && value.length === 1) ||
        value === ''
      ) {
        const newOtp = [...otp]
        newOtp[index] = value?.slice(-1)
        setOtp(newOtp)
        const currentValue = newOtp.join('')
        if (handleChange) {
          handleChange(e, currentValue)
        }
        if (setFieldValue && name) {
          setFieldValue(name, currentValue)
        }
        if (value && index < count - 1) {
          inputRefs.current[index + 1]?.focus()
        }
      } else return
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
      if (event.key === 'Backspace' && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
        const newOtp = [...otp]
        newOtp[index - 1] = ''
        setOtp(newOtp)
      }

      if (event.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
      if (event.key === 'ArrowRight' && index < count - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const setInputRef = useCallback((el: HTMLInputElement | null, index: number) => {
      inputRefs.current[index] = el
    }, [])

    return (
      <div className={classNames('otp', className, `otp-${type}`)}>
        <Label text={label} required={required} disabled={disabled} dataId={dataId} />
        <div className="otp__inner flexbox">
          {otp.map((digits, index) => (
            <Input
              key={index}
              size={size}
              ref={(el) => setInputRef(el, index)}
              max={1}
              type={type}
              pattern={pattern}
              hasError={hasError}
              isValid={isValid}
              readonly={disabled}
              disabled={disabled}
              placeholder={placeholder}
              currentValue={digits}
              handleChange={(e, value) => onChange(e, value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              autoFocus={autoFocus && index === 0}
              {...rest}
            />
          ))}
        </div>
        {error || successMessage ? (
          <div className="input__message mt-8">
            {isErrorVisible && error ? (
              <ErrorMessage message={error} icon="infoFilled" dataId={dataId} />
            ) : null}
            {successMessage ? (
              <Text size="small" type="success-light" className="flexbox align-items--center">
                <>
                  <IconCheckmarkCircleFilled type="success-light" size="xsmall" />
                  <span className="ml-4">{successMessage}</span>
                </>
              </Text>
            ) : null}
          </div>
        ) : null}
      </div>
    )
  }
)

OneTimePassword.displayName = 'OneTimePassword'
