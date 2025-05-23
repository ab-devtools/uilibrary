import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconPanelLeftFilled = ({
  size,
  type,
  className = '',
  onClick,
  refHandler,
  id,
  dataId
}: ISVGIconProps): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={classNames('svg-icon', {
      [`svg-icon__size-${size}`]: size,
      [`svg-icon__type-${type}`]: type,
      [className]: className
    })}
    viewBox="0 0 24 24"
    fill="none"
    onClick={onClick}
    ref={refHandler}
    id={id}
    data-id={dataId ? `${dataId}-svg-icon` : ''}
  >
    <path
      d="M14.1047 14.4761C14.3707 14.7531 14.826 14.7756 15.1216 14.5263L17.5216 12.5017C17.6733 12.3738 17.7599 12.1914 17.7599 12.0001C17.7599 11.8088 17.6733 11.6265 17.5216 11.4985L15.1216 9.47398C14.826 9.22465 14.3707 9.2471 14.1047 9.52413C13.8387 9.80116 13.8627 10.2279 14.1582 10.4772L15.1636 11.3253L11.7599 11.3253C11.3623 11.3253 11.0399 11.6274 11.0399 12.0001C11.0399 12.3728 11.3623 12.675 11.7599 12.675H15.1636L14.1582 13.523C13.8627 13.7724 13.8387 14.1991 14.1047 14.4761ZM2.3999 7.27505C2.3999 5.90814 3.58187 4.80005 5.0399 4.80005H18.9599C20.4179 4.80005 21.5999 5.90814 21.5999 7.27505V16.725C21.5999 18.092 20.4179 19.2 18.9599 19.2H5.0399C3.58187 19.2 2.3999 18.092 2.3999 16.725V7.27505ZM9.1199 6.15005V17.85H18.9599C19.6226 17.85 20.1599 17.3464 20.1599 16.725V7.27505C20.1599 6.65373 19.6226 6.15005 18.9599 6.15005H9.1199Z"
      fill="#222222"
    />
  </svg>
)

export default IconPanelLeftFilled
