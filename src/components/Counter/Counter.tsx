import type { JSX } from 'react'
import React, { forwardRef } from 'react'
import { Input } from '../Input'
import type { ICounterProps } from './types'
import classNames from 'classnames'
import { noop } from '../../utils/helpers'
import IconAdd from '../SVGIcons/IconAdd'
import IconSubtract from '../SVGIcons/IconSubtract'
import type { TChangeEventType } from '../../types/globalTypes'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Counter = forwardRef((props: ICounterProps, ref): JSX.Element => {
  const {
    max = 99999999,
    min = 0,
    handleChange,
    name,
    counter = 0,
    setFieldValue,
    customError,
    label,
    required = false,
    value,
    hasError = false,
    ...rest
  } = props

  const counterValue = value !== undefined ? parseInt(value as string) : counter

  const isFormField = value !== undefined

  const customChangeHandler = (inputedValue: number | string) => {
    if (handleChange) {
      inputedValue > max
        ? handleChange(max)
        : inputedValue < min
        ? handleChange(min)
        : handleChange(inputedValue)
    }
    if (setFieldValue && name) {
      setFieldValue(name, inputedValue, { shouldValidate: hasError })
    }
  }

  const increase = () => customChangeHandler(counterValue - 1)
  const decrease = () => customChangeHandler(counterValue + 1)
  const onInputChange = (e: TChangeEventType) => customChangeHandler(parseInt(e.target.value))

  const isIncreaseIconDisabled = counterValue <= min

  const isDecreaseIconDisabled = counterValue === undefined || counterValue >= max

  return (
    <Input
      {...rest}
      className="counter"
      error={isFormField ? '' : customError}
      label={label}
      required={required}
      leftIconProps={{
        dataId: `${rest.dataId}-decrement`,
        size: 'small',
        Component: IconSubtract,
        className: classNames({ action_active: !isIncreaseIconDisabled }),
        type: isIncreaseIconDisabled ? 'disabled' : 'primary',
        onClick: isIncreaseIconDisabled ? noop : increase
      }}
      rightIconProps={{
        dataId: `${rest.dataId}-increment`,
        Component: IconAdd,
        size: 'small',
        className: classNames({ action_active: !isDecreaseIconDisabled }),
        onClick: isDecreaseIconDisabled ? noop : decrease,
        type: isDecreaseIconDisabled ? 'disabled' : 'primary'
      }}
      type="number"
      name={name}
      value={counterValue}
      onChange={onInputChange}
    />
  )
})

Counter.displayName = 'Counter'
