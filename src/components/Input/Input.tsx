import type { JSX } from 'react'
import React, { useMemo } from 'react'
import InputMask from 'react-input-mask'
import classNames from 'classnames'
import { NumericFormat, PatternFormat } from 'react-number-format'
import type { InputCustomProps } from './types'
import { Label, ErrorMessage } from '../../helperComponents'
import { Text } from '../Text'

import IconCheckmarkCircleFilled from '../SVGIcons/IconCheckmarkCircleFilled'
import type { TChangeEventType } from '../../types/globalTypes'

export const Input = React.forwardRef<HTMLInputElement, InputCustomProps>(
  (
    {
      datePlaceHolderText,
      className,
      size = 'large',
      error,
      hasError,
      label,
      mask,
      maskChar,
      format,
      maskPlaceholder,
      currentValue,
      name,
      leftIconProps,
      rightIconProps,
      disabled,
      required,
      readonly,
      placeholder,
      type = 'text',
      helperText,
      successMessage,
      maxCount,
      setFieldValue,
      handleChange,
      dataId = '',
      isValid,
      allowLeadingZeros,
      thousandSeparator = '',
      allowNegative = false,
      hideCounter = false,
      labelAddons,
      witUpperCase = false,
      allowEmptyFormatting,
      isAllowed,
      isTrimValues = false,
      ...rest
    },
    ref
  ): JSX.Element => {
    const { onChange, onBlur, ...cleanRest } = rest

    const isErrorVisible = hasError !== undefined ? hasError : !!error
    const placeHolder = label === placeholder ? '' : placeholder || datePlaceHolderText
    const changeHandler = (event: TChangeEventType) => {
      const eventValue = event.target.value

      const valueWithoutSeparator =
        type === 'numeric' ? eventValue.replace(new RegExp(thousandSeparator, 'g'), '') : eventValue

      const formatedValue = witUpperCase
        ? valueWithoutSeparator.toUpperCase()
        : valueWithoutSeparator

      if (formatedValue.length - 1 === maxCount) {
        return
      }

      event.target.value = formatedValue

      if (setFieldValue && name) {
        setFieldValue(name, formatedValue)
      }

      if (handleChange) {
        handleChange(event, formatedValue)
      }
      if (onChange) {
        onChange(event)
      }
    }

    const blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
      if (isTrimValues) {
        const trimmedValue = event.target.value.trim()
        if (trimmedValue !== event.target.value) {
          event.target.value = trimmedValue
          changeHandler(event)
        }
      }
      if (onBlur) {
        onBlur(event)
      }
    }

    const currentLength = useMemo(() => {
      if (currentValue) {
        return currentValue.length
      }
      if (rest && rest.value && typeof rest.value === 'string') {
        return rest.value.length
      }
      return 0
    }, [rest, currentValue])

    const input = format ? (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <PatternFormat
        {...cleanRest}
        format={format}
        name={name}
        onBlur={blurHandler}
        onChange={changeHandler}
        placeholder={placeHolder}
        readOnly={readonly}
        data-id={dataId}
        disabled={disabled}
        maxLength={maxCount}
        allowEmptyFormatting={allowEmptyFormatting}
        {...(currentValue ? { value: currentValue } : { value: '' })}
      />
    ) : mask ? (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <InputMask
        name={name}
        mask={mask}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={() => ref && ref()}
        {...cleanRest}
        placeholder={placeHolder}
        onBlur={blurHandler}
        onChange={changeHandler}
        disabled={disabled}
        data-id={dataId}
        className={`${isErrorVisible ? 'with-error-styles' : ''}`}
        {...(currentValue ? { value: currentValue } : {})}
        maskChar={maskChar}
        maskPlaceholder={maskPlaceholder}
      />
    ) : type === 'numeric' ? (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <NumericFormat
        {...cleanRest}
        name={name}
        onBlur={blurHandler}
        onChange={changeHandler}
        placeholder={placeHolder}
        readOnly={readonly}
        allowLeadingZeros={allowLeadingZeros}
        thousandSeparator={thousandSeparator}
        allowNegative={allowNegative}
        maxLength={maxCount}
        inputMode={'numeric'}
        disabled={disabled}
        isAllowed={isAllowed}
        getInputRef={ref}
        {...(currentValue !== undefined ? { value: currentValue } : {})}
      />
    ) : (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <input
        readOnly={readonly}
        disabled={disabled}
        name={name}
        ref={ref}
        type={type}
        placeholder={placeHolder}
        onBlur={blurHandler}
        onChange={changeHandler}
        data-id={dataId}
        {...cleanRest}
        {...(currentValue !== undefined ? { value: currentValue } : {})}
      />
    )

    return (
      <div
        className={classNames(`input input--${size}`, className, {
          'input--icon-left': leftIconProps,
          'input--icon-right': rightIconProps,
          'input--invalid': isErrorVisible || !!error,
          'input--valid': isValid,
          'input--disabled': disabled
        })}
      >
        <Label
          text={label}
          required={required}
          disabled={disabled}
          labelAddons={labelAddons}
          dataId={dataId}
        />
        <div className="input__inner">
          {input}
          {leftIconProps?.Component ? (
            <leftIconProps.Component
              size="small"
              {...leftIconProps}
              className={classNames('input__icon', 'input__icon--left', {
                [`${leftIconProps.className}`]: !!leftIconProps.className
              })}
            />
          ) : null}
          {rightIconProps?.Component ? (
            <rightIconProps.Component
              size="small"
              {...rightIconProps}
              className={classNames('input__icon', 'input__icon--right', {
                [`${rightIconProps.className}`]: !!rightIconProps.className
              })}
            />
          ) : null}
        </div>

        {error || successMessage || helperText || maxCount ? (
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
            {helperText && !successMessage && !(isErrorVisible || error) ? (
              <Text size="small" type={disabled ? 'disabled' : 'secondary'}>
                {helperText}
              </Text>
            ) : null}

            {maxCount && !hideCounter && !hasError ? (
              <Text
                size="small"
                type={disabled ? 'disabled' : 'secondary'}
                className="input__counter"
              >
                {`${currentLength}/${maxCount}`}
              </Text>
            ) : null}
          </div>
        ) : null}
      </div>
    )
  }
)

Input.displayName = 'FormInput'
