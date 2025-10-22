import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconVerifiedFilled = ({
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
    viewBox="0 0 20 20"
    fill="none"
    onClick={onClick}
    ref={refHandler}
    id={id}
    data-id={dataId ? `${dataId}-svg-icon` : ''}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M16.875 4.1665C14.6555 4.1665 12.4934 3.38027 10.375 1.7915C10.1528 1.62484 9.84722 1.62484 9.625 1.7915C7.50664 3.38027 5.34451 4.1665 3.125 4.1665C2.77982 4.1665 2.5 4.44633 2.5 4.7915V9.16651C2.5 13.3342 4.96464 16.3963 9.77092 18.2897C9.91813 18.3477 10.0819 18.3477 10.2291 18.2897C15.0354 16.3963 17.5 13.3342 17.5 9.16651V4.7915C17.5 4.44633 17.2202 4.1665 16.875 4.1665ZM13.964 7.75223L8.96399 12.3356C8.71733 12.5617 8.33634 12.5534 8.09972 12.3168L6.01639 10.2334C5.77231 9.98937 5.77231 9.59364 6.01639 9.34956C6.26047 9.10549 6.6562 9.10549 6.90028 9.34956L8.56046 11.0098L13.1193 6.83078C13.3738 6.59754 13.7691 6.61473 14.0024 6.86918C14.2356 7.12363 14.2184 7.51898 13.964 7.75223Z"
      fill="#888888"
    />
  </svg>
)

export default IconVerifiedFilled
