import type { ReactElement } from 'react'
import React from 'react'
import { Text } from '../Text'
import type { TChipsProps } from './types'
import { ChipCustomType } from './types'
import classNames from 'classnames'
import IconDismissCircleFilled from '../SVGIcons/IconDismissCircleFilled'
import { LEFT_ICON_SIZE_MAPPING, RIGHT_ICON_SIZE_MAPPING, TEXT_SIZE_MAPPING } from './consts'

export const Chips = (props: TChipsProps): ReactElement => {
  const {
    type = 'filled',
    color = 'primary',
    size = 'large',
    text,
    disabled,
    className = '',
    leftIconProps,
    withAction,
    onClick,
    dataId = ''
  } = props

  const customType = disabled
    ? 'disabled'
    : type == ChipCustomType.filled
    ? ChipCustomType.inverse
    : color

  const handleClick = (event: TClickEventType) => {
    event.stopPropagation()
    onClick?.(event)
  }

  return (
    <div
      className={classNames(
        `chips chips--${type} chips--${disabled ? 'disabled' : color} chips--${size}`,
        className
      )}
    >
      {leftIconProps?.Component ? (
        <leftIconProps.Component
          dataId={`${dataId}-icon`}
          size={RIGHT_ICON_SIZE_MAPPING[size]}
          type={customType}
          className={'chips__icon'}
          {...leftIconProps}
        />
      ) : null}
      {text ? (
        <Text
          dataId={`${dataId}-text`}
          type={customType}
          size={TEXT_SIZE_MAPPING[size]}
          className="chips__label text-truncate"
        >
          <>{text}</>
        </Text>
      ) : null}
      {withAction && (
        <IconDismissCircleFilled
          dataId={`${dataId}-icon`}
          size={LEFT_ICON_SIZE_MAPPING[size]}
          type={customType}
          className="chips__delete ml-4"
          onClick={handleClick}
        />
      )}
    </div>
  )
}
