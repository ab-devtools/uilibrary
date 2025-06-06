import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconPlayFilled = ({
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
      d="M4.99414 5.27392C4.99414 3.56707 6.82023 2.48176 8.31952 3.29755L20.6811 10.0237C22.2473 10.8759 22.2473 13.1243 20.6811 13.9764L8.31952 20.7026C6.82024 21.5184 4.99414 20.4331 4.99414 18.7262V5.27392Z"
      fill="#222222"
    />
  </svg>
)

export default IconPlayFilled
