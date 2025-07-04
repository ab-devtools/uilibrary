import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconBookOpenFilled = ({
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
    onClick={onClick}
    ref={refHandler}
    id={id}
    data-id={dataId ? `${dataId}-svg-icon` : ''}
  >
    <path
      d="M4 4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H10C10.7684 20 11.4692 19.7111 12 19.2361C12.5308 19.7111 13.2316 20 14 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4H14C13.2316 4 12.5308 4.28885 12 4.7639C11.4692 4.28885 10.7684 4 10 4H4ZM11 7V17C11 17.5523 10.5523 18 10 18H4V6H10C10.5523 6 11 6.44772 11 7ZM13 17V7C13 6.44772 13.4477 6 14 6H20V18H14C13.4477 18 13 17.5523 13 17Z"
      fill="#222222"
    />
  </svg>
)

export default IconBookOpenFilled
