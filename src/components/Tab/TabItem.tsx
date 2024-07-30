import React, { MouseEvent } from 'react'
import { Icon } from '../Icon'
import { Badge } from '../Badge'
import { noop } from '../../utils/helpers'
import { TTabItemProps } from './types'
import classNames from 'classnames'

export const TabItem = (props: TTabItemProps): JSX.Element | null => {
  const {
    size = 'large',
    iconProps,
    badgeProps,
    label,
    className = '',
    disabled = false,
    isSelected,
    rightIconProps,
    val,
    onClick,
    dataId
  } = props

  return (
    <div
      onClick={disabled ? noop : onClick}
      className={classNames(
        'tab',
        { [`tab--${size}`]: size },
        { 'tab--disabled': disabled },
        { 'tab--selected': isSelected },
        className
      )}
    >
      {iconProps?.name ? (
        <Icon
          {...iconProps}
          className="tab__icon mr-8"
          size={`${size == 'small' ? 'xsmall' : 'small'}`}
        />
      ) : null}
      {iconProps?.Component ? (
        <iconProps.Component
          className="tab__icon mr-8"
          size={`${size == 'small' ? 'xsmall' : 'small'}`}
          {...iconProps}
        />
      ) : null}
      <span className="tab__label" data-id={dataId}>
        {label}
      </span>
      {rightIconProps?.Component ? (
        <rightIconProps.Component
          onClick={(e: MouseEvent<unknown>) => {
            if (rightIconProps?.action) {
              e.stopPropagation()
              rightIconProps?.action(val)
            }
          }}
          className="tab__icon ml-8"
          size={`${size == 'small' ? 'xsmall' : 'small'}`}
          {...rightIconProps}
        />
      ) : null}
      {rightIconProps?.name ? (
        <Icon
          {...rightIconProps}
          onClick={(e) => {
            if (rightIconProps?.action) {
              e.stopPropagation()
              rightIconProps?.action(val)
            }
          }}
          className="tab__icon ml-8"
          size={`${size == 'small' ? 'xsmall' : 'small'}`}
        />
      ) : null}
      {badgeProps?.text ? (
        <Badge className="tab__badge ml-8" size="small" type="secondary" {...badgeProps} />
      ) : null}
    </div>
  )
}
