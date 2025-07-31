import type { ReactElement } from 'react'
import React from 'react'
import { Text } from '../Text'
import type { TStatusProps } from './types'
import classNames from 'classnames'
import { COLOR_MAPPING } from './consts'

enum StatusTextSize {
  large = 'standard',
  medium = 'small',
  small = 'xsmall'
}

export const Status = (props: TStatusProps): ReactElement => {
  const {
    type = 'primary',
    size = 'large',
    text = '',
    children,
    className = '',
    leftIconProps,
    rightIconProps,
    withCircle = true,
    dataId
  } = props

  return (
    <div className={classNames(`status status--${size}`, className)}>
      {leftIconProps?.Component ? (
        <leftIconProps.Component size="xsmall" type={type} className="mr-6" {...leftIconProps} />
      ) : null}
      {withCircle && !leftIconProps?.Component ? (
        <span
          className={classNames('status__circle', 'mr-8', {
            [`status__circle--${type}`]: true
          })}
        />
      ) : null}
      <div className="status__label">
        <Text
          dataId={`${dataId}-text`}
          type={!withCircle ? COLOR_MAPPING[type] : 'primary'}
          size={StatusTextSize[size]}
        >
          {text}
        </Text>
        {children}
      </div>
      {rightIconProps}
    </div>
  )
}
