import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconStar = ({
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
      d="M10.7878 3.10263C11.283 2.09926 12.7138 2.09925 13.209 3.10263L15.567 7.88036L20.8395 8.6465C21.9468 8.8074 22.3889 10.1682 21.5877 10.9492L17.7724 14.6681L18.6731 19.9193C18.8622 21.0222 17.7047 21.8632 16.7143 21.3425L11.9984 18.8632L7.28252 21.3425C6.29213 21.8632 5.13459 21.0222 5.32374 19.9193L6.2244 14.6681L2.40916 10.9492C1.60791 10.1682 2.05005 8.8074 3.15735 8.6465L8.42988 7.88036L10.7878 3.10263ZM11.9984 4.03903L9.74008 8.61492C9.54344 9.01336 9.16332 9.28953 8.72361 9.35343L3.67382 10.0872L7.32788 13.649C7.64606 13.9592 7.79125 14.406 7.71614 14.844L6.85353 19.8734L11.3702 17.4988C11.7635 17.292 12.2333 17.292 12.6266 17.4988L17.1433 19.8734L16.2807 14.844C16.2056 14.406 16.3508 13.9592 16.6689 13.649L20.323 10.0872L15.2732 9.35343C14.8335 9.28953 14.4534 9.01336 14.2568 8.61492L11.9984 4.03903Z"
      fill="#222222"
    />
  </svg>
)

export default IconStar
