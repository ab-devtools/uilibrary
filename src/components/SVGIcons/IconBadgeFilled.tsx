import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconBadgeFilled = ({
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
      d="M16 4.50146C16 6.43446 17.567 8.00146 19.5 8.00146C20.0372 8.00146 20.5461 7.88043 21.001 7.66416L21 18.2498C21 19.7686 19.7688 20.9998 18.25 20.9998H5.75C4.23122 20.9998 3 19.7686 3 18.2498V5.74978C3 4.231 4.23122 2.99978 5.75 2.99978L16.3378 2.99942C16.1212 3.45457 16 3.96386 16 4.50146ZM19.5 2.00146C20.8807 2.00146 22 3.12075 22 4.50146C22 5.88218 20.8807 7.00146 19.5 7.00146C18.1193 7.00146 17 5.88218 17 4.50146C17 3.12075 18.1193 2.00146 19.5 2.00146Z"
      fill="#222222"
    />
  </svg>
)

export default IconBadgeFilled
