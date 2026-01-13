import type { JSX } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import type { InputPasswordsProps } from './types'
import { Input } from './Input'
import { IconEyeOff, IconEyeOn } from '../SVGIcons'
import { Text } from '../Text'
import { Divider } from '../Divider'
import IconDismissCircle from '../SVGIcons/IconDismissCircle'
import IconDismissCircleFilled from '../SVGIcons/IconDismissCircleFilled'
import IconCheckmarkCircleFilled from '../SVGIcons/IconCheckmarkCircleFilled'
import { Tooltip } from '../Tooltip'
import type { ISVGIconProps } from '../SVGIcons/types'
import { Popover } from '../Popover'
import { Positions } from '../Tooltip/types'
import classNames from 'classnames'
import type { TClickEventType } from '../../types/globalTypes'

const getTextType = (password: string, isValid: boolean, isFocused: boolean) => {
  if (password.length === 0) return 'tertiary'
  if (isValid) return 'success-light'
  return isFocused ? 'disabled' : 'danger-light'
}

const getIconType = (
  password: string,
  isValid: boolean,
  isFocused: boolean,
  disabled: boolean | undefined
) => {
  if (password.length === 0) return <IconDismissCircle size={'xsmall'} type="tertiary" />
  if (isValid)
    return (
      <IconCheckmarkCircleFilled size={'xsmall'} type={disabled ? 'disabled' : 'success-light'} />
    )
  return isFocused ? (
    <IconDismissCircle size={'xsmall'} type={'tertiary'} />
  ) : (
    <IconDismissCircleFilled size={'xsmall'} type={'danger-light'} />
  )
}
const IconEyeOnWithTooltip = (props: ISVGIconProps) => {
  const { tooltipAddons } = props
  return (
    <>
      <Tooltip dataId={'eye-on-tooltip'} text={tooltipAddons?.text as string} {...tooltipAddons} />
      <IconEyeOn {...props} dataId={'eye-on-icon'} id={tooltipAddons?.id as string} />
    </>
  )
}
const IconEyeOffTooltip = (props: ISVGIconProps) => {
  const { tooltipAddons } = props
  return (
    <>
      <Tooltip dataId={'eye-off-tooltip'} text={tooltipAddons?.text as string} {...tooltipAddons} />
      <IconEyeOff {...props} dataId={'eye-off-icon'} id={tooltipAddons?.id as string} />
    </>
  )
}

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordsProps>(
  (props, ref): JSX.Element => {
    const {
      className,
      validations,
      onValidationChange,
      onPasswordShow,
      dataId,
      label,
      placeholder,
      hasError,
      error,
      onChange,
      onBlur,
      onFocus,
      tooltipAddons,
      capsLockText,
      isCapsLockOn,
      setIsCapsLockOn,
      id,
      ...rest
    } = props
    const inputRef = useRef<HTMLInputElement>(null)
    const combinedRef = (ref || inputRef) as React.RefObject<HTMLInputElement>
    const [password, setPassword] = useState<string>('')
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
    const [validationResults, setValidationResults] = useState<Record<string, boolean>>({})
    const [isFocused, setIsFocused] = useState<boolean>(false)

    const eyeIcon = {
      Component: !isShowPassword ? IconEyeOnWithTooltip : IconEyeOffTooltip,
      onMouseDown: (e: React.MouseEvent) => {
        e.preventDefault()
      },
      onClick: () => {
        setIsShowPassword((prev) => !prev)
        onPasswordShow?.(!isShowPassword)
      }
    }
    const handleCapsLockDetection = (event: React.KeyboardEvent<HTMLInputElement>) => {
      setIsCapsLockOn?.(event.getModifierState('CapsLock'))
    }

    useEffect(() => {
      const results = validations.reduce((acc: Record<string, boolean>, rule) => {
        acc[rule.label] = rule.test(password)
        return acc
      }, {})

      setValidationResults(results)

      const isValid = Object.values(results).every(Boolean)
      onValidationChange?.(isValid)
    }, [password, validations, onValidationChange])

    useEffect(() => {
      if (combinedRef.current && password) {
        const length = combinedRef.current.value.length
        requestAnimationFrame(() => {
          combinedRef.current?.focus()
          combinedRef.current?.setSelectionRange(length, length)
        })
      }
    }, [isShowPassword, setIsShowPassword])

    return (
      <div className={classNames('input-password', className)}>
        {isCapsLockOn && !isShowPassword ? (
          <Popover
            dataId={'caps-lock-popover'}
            text={capsLockText}
            id={id}
            clicked={true}
            position={Positions?.MIDDLE_LEFT}
          />
        ) : null}
        <Input
          {...rest}
          id={id}
          ref={combinedRef}
          dataId={dataId}
          label={label}
          type={isShowPassword ? 'text' : 'password'}
          onChange={(e) => {
            setPassword(e.target.value)
            if (onChange) {
              onChange(e)
            }
          }}
          placeholder={placeholder}
          rightIconProps={{
            ...eyeIcon,
            tooltipAddons
          }}
          onFocus={(e) => {
            setIsFocused(true)
            if (onFocus) {
              onFocus(e as TClickEventType)
            }
          }}
          onBlur={(e) => {
            setIsFocused(false)
            if (onBlur) {
              // @TODO add onBlur correct type
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onBlur(e)
            }
          }}
          onKeyDown={handleCapsLockDetection}
          onKeyUp={handleCapsLockDetection}
          error={error}
          hasError={hasError}
        />
        <div className={'input-password__validation mt-8'}>
          {validations.map((rule) => (
            <div className={'input-password__validation__item'} key={rule?.label}>
              {getIconType(password, validationResults[rule.label], isFocused, props?.disabled)}
              <Text
                size={'small'}
                className={'pl-4'}
                key={rule.label}
                dataId={rule?.dataId || ''}
                type={getTextType(password, validationResults[rule.label], isFocused)}
              >
                {rule.label}
              </Text>
            </div>
          ))}
          {hasError && validations?.length ? (
            <Divider type={'primary'} color={'light'} isHorizontal={true} />
          ) : null}
        </div>
      </div>
    )
  }
)

InputPassword.displayName = 'InputPassword'
