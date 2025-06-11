import type { JSX } from 'react'
import React, { useMemo } from 'react'
import InputMask from 'react-input-mask'
import classNames from 'classnames'
import { NumericFormat, PatternFormat } from 'react-number-format'
import type { InputCustomProps } from './types'
import { Label, ErrorMessage } from '../../helperComponents'
import { Text } from '../Text'

import IconCheckmarkCircleFilled from '../SVGIcons/IconCheckmarkCircleFilled'

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
      ...rest
    },
    ref
  ): JSX.Element => {
    const isErrorVisible = hasError !== undefined ? hasError : !!error
    const placeHolder = label === placeholder ? '' : placeholder || datePlaceHolderText

    const changeHandler = (event: TChangeEventType) => {
      const eventValue = event.target.value
      const valueWithoutSeparator =
        type === 'numeric' ? eventValue.replace(new RegExp(thousandSeparator, 'g'), '') : eventValue

      if (eventValue.length - 1 === maxCount) {
        return
      }
      if (setFieldValue && name) {
        setFieldValue(name, valueWithoutSeparator)
      }
      if (handleChange) {
        handleChange(
          event,
          !witUpperCase ? valueWithoutSeparator : valueWithoutSeparator.toUpperCase()
        )
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
        {...rest}
        format={format}
        name={name}
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
        {...rest}
        placeholder={placeHolder}
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
        {...rest}
        name={name}
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
        onChange={changeHandler}
        data-id={dataId}
        {...rest}
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
                [leftIconProps.className || '']: !!leftIconProps.className
              })}
            />
          ) : null}
          {rightIconProps?.Component ? (
            <rightIconProps.Component
              size="small"
              {...rightIconProps}
              className={classNames('input__icon', 'input__icon--right', {
                [rightIconProps.className || '']: !!rightIconProps.className
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
              <Text size="small" type="success" className="flexbox align-items--center">
                <>
                  <IconCheckmarkCircleFilled type="success" size="xsmall" />
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
