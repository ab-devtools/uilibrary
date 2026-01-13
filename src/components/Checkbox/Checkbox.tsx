import type { ForwardedRef, ReactElement } from 'react'
import React, { useRef, useMemo, forwardRef } from 'react'
import classnames from 'classnames'
import { Popover } from '../Popover'
import { Link } from '../Link'
import { Text } from '../Text'
import type { TCheckboxProps } from './types'
import IconInfo from '../SVGIcons/IconInfo'
import { IconDynamicComponent } from '../../helperComponents/IconDynamicComponent'

export const Checkbox = forwardRef(
  (props: TCheckboxProps, ref: ForwardedRef<HTMLInputElement>): ReactElement | null => {
    const {
      label,
      disabled,
      required = false,
      link,
      name,
      setFieldValue,
      selectedValue,
      value,
      className = '',
      iconProps = { name: 'checkmark' },
      dataId = '',
      onClick,
      beforeLink,
      afterLink,
      helperText = '',
      popoverAddons,
      isInvalid
    } = props

    const localRef = useRef(null)
    const inputRef = ref && Object.keys(ref).length ? ref : localRef
    const isChecked = !!value || selectedValue

    const changeHandler = () => {
      if (name && setFieldValue) {
        setFieldValue(name, !isChecked, { shouldValidate: !isChecked })
      }
      if (onClick) {
        onClick(!isChecked)
      }
    }

    const checkboxLabelPopover = popoverAddons ? (
      <Popover id={`${popoverAddons.id}`} {...popoverAddons}>
        <div id={`${popoverAddons.id}`}>
          <IconInfo
            dataId={`${dataId}-icon`}
            type="information-light"
            size="xsmall"
            className={'ml-4 pointer'}
            onClick={(e) => {
              e.stopPropagation()
              changeHandler()
            }}
          />
        </div>
      </Popover>
    ) : null

    const checkboxLabel = useMemo(() => {
      if (!label) {
        return null
      }
      if (typeof label !== 'string') {
        return label
      }
      if (!link) {
        return (
          <Text type={disabled ? 'disabled' : 'primary'} className="controller__label">
            <>
              {label}
              {required && <sup>*</sup>}
            </>
          </Text>
        )
      }
      return (
        <Text type={disabled ? 'disabled' : 'primary'} className="controller__label">
          <>
            {beforeLink && <span className="mr-4">{beforeLink}</span>}
            <Link dataId={dataId} url={link} target="_blank">
              {label}
            </Link>
            {afterLink && <span className="ml-4">{afterLink}</span>}
            {required && <sup>*</sup>}
          </>
        </Text>
      )
    }, [label, link])

    return (
      <>
        <label
          className={classnames('controller', {
            'controller--checkbox': true,
            'controller--disabled': disabled,
            'controller--error': isInvalid,
            [className]: !!className
          })}
        >
          <input
            data-id={dataId}
            type="checkbox"
            ref={inputRef}
            tabIndex={0}
            onChange={changeHandler}
            checked={Boolean(isChecked)}
            disabled={disabled}
          />
          <span className="controller__icon">
            <IconDynamicComponent
              componentName={iconProps.name}
              size="xxsmall"
              type={disabled ? 'disabled' : 'inverse'}
              className="controller__mark"
            />
          </span>
          {checkboxLabel ? (
            <div className="controller__right">
              <div className="flexbox">
                {checkboxLabel}
                {checkboxLabelPopover}
              </div>
              {helperText ? (
                <Text size="small" type={disabled ? 'disabled' : 'secondary'}>
                  {helperText}
                </Text>
              ) : null}
            </div>
          ) : null}
        </label>
      </>
    )
  }
)

Checkbox.displayName = 'Checkbox'
