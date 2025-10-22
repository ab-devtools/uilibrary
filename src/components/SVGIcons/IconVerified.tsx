import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconVerified = ({
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
      d="M13.964 7.75223C14.2184 7.51898 14.2356 7.12363 14.0024 6.86918C13.7691 6.61473 13.3738 6.59754 13.1193 6.83079L8.56046 11.0098L6.90028 9.34957C6.6562 9.10549 6.26047 9.10549 6.01639 9.34957C5.77231 9.59365 5.77231 9.98937 6.01639 10.2335L8.09972 12.3168C8.33634 12.5534 8.71733 12.5617 8.96399 12.3356L13.964 7.75223ZM16.875 4.1665C14.6555 4.1665 12.4934 3.38027 10.375 1.7915C10.1528 1.62484 9.84722 1.62484 9.625 1.7915C7.50664 3.38027 5.34451 4.1665 3.125 4.1665C2.77982 4.1665 2.5 4.44633 2.5 4.7915V9.16651C2.5 13.3342 4.96464 16.3963 9.77092 18.2897C9.91813 18.3477 10.0819 18.3477 10.2291 18.2897C15.0354 16.3963 17.5 13.3342 17.5 9.16651V4.7915C17.5 4.44633 17.2202 4.1665 16.875 4.1665ZM3.75 5.39811C5.89779 5.27138 7.98403 4.49008 10 3.06468C12.016 4.49008 14.1022 5.27138 16.25 5.39811V9.16651C16.25 12.7128 14.2055 15.3156 10 17.0347C5.79447 15.3156 3.75 12.7128 3.75 9.16651V5.39811Z"
      fill="#CCCCCC"
    />
  </svg>
)

export default IconVerified
