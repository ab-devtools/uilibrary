import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { Icon } from '../Icon'
import { Label } from '../../helperComponents'
import { TSwitcherProps } from './types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Switcher = forwardRef((props: TSwitcherProps, ref): JSX.Element => {
  const {
    onClick,
    id = '',
    name,
    value,
    disabled,
    label,
    size = 'large',
    setFieldValue,
    selectedValue,
    className = '',
    labelAddons
  } = props
  const isChecked = !!value || !!selectedValue

  const changeHandler = () => {
    if (name && setFieldValue) {
      setFieldValue(name, !isChecked)
    }

    if (onClick) {
      onClick(!isChecked)
    }
  }

  return (
    <div className="switcher">
      {label && <Label text={label} disabled={disabled} labelAddons={labelAddons} />}
      <label
        id={id}
        className={classnames(
          'controller',
          'controller--switch',
          `controller--switch-${size}`,
          className,
          { 'controller--disabled': disabled }
        )}
      >
        <input
          type="checkbox"
          tabIndex={0}
          onChange={changeHandler}
          checked={isChecked}
          disabled={disabled}
        />
        <span className="controller__icon">
          <span className="controller__icon__inner">
            <Icon name="mark" size="xsmall" className="controller__mark" />
          </span>
        </span>
      </label>
    </div>
  )
})

Switcher.displayName = 'Switcher'
