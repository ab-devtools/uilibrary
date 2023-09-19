import React from 'react'
import Icon from '../Icon'
import { TCheckboxProps } from './types'
import '../../assets/styles/components/_controllers.scss'
import Link from '../Link'
import Text from '../Text'

export const Checkbox = (props: TCheckboxProps): JSX.Element | null => {
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
    IconProps = { name: 'mark' },
    dataId = '',
    onClick
  } = props

  const isChecked = !!value || selectedValue

  const changeHandler = () => {
    if (name && setFieldValue) {
      setFieldValue(name, !isChecked, { shouldValidate: !isChecked })
    }
    if (onClick) {
      onClick(!isChecked)
    }
  }

  return (
    <label
      className={`controller controller--checkbox 
                  ${disabled ? 'controller--disabled' : ''}
                  ${className}
                  `}
    >
      <input
        data-id={dataId}
        type="checkbox"
        tabIndex={0}
        onChange={changeHandler}
        checked={isChecked}
        disabled={disabled}
      />
      <span className="controller__icon">
        <Icon
          name={IconProps.name}
          size="xsmall"
          type={`${disabled ? 'disabled' : 'inverse'}`}
          className="controller__mark"
        />
      </span>
      {label ? (
        link ? (
          <Link dataId={dataId} url={link} taget="_blank" className="controller__link">
            {label}
          </Link>
        ) : (
          <Text type={disabled ? 'disabled' : 'primary'} className="controller__label">
            <>
              {label}
              {required && <sup>*</sup>}
            </>
          </Text>
        )
      ) : null}
    </label>
  )
}

export default Checkbox
