import React, { ReactElement } from 'react'
import { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconLockClosedFilled = ({
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
    <g id="State=Closed, Size=24, Theme=Filled">
      <path
        id="Shape"
        d="M12 2C14.2091 2 16 3.79086 16 6V8H18.5C19.3284 8 20 8.67157 20 9.5V20.5C20 21.3284 19.3284 22 18.5 22H5.5C4.67157 22 4 21.3284 4 20.5V9.5C4 8.67157 4.67157 8 5.5 8H8V6C8 3.79086 9.79086 2 12 2ZM12.0001 13.5C11.1717 13.5 10.5001 14.1716 10.5001 15C10.5001 15.8284 11.1717 16.5 12.0001 16.5C12.8286 16.5 13.5001 15.8284 13.5001 15C13.5001 14.1716 12.8286 13.5 12.0001 13.5ZM12 4C10.8954 4 10 4.89543 10 6V8H14V6C14 4.89543 13.1046 4 12 4Z"
        fill="#222222"
      />
    </g>
  </svg>
)

export default IconLockClosedFilled
