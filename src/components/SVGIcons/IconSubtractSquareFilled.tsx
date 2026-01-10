import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconSubtractSquareFilled = ({
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
      d="M3 6.25C3 4.455 4.455 3 6.25 3H17.75C19.545 3 21 4.455 21 6.25V17.75C21 19.545 19.545 21 17.75 21H6.25C4.455 21 3 19.545 3 17.75V6.25ZM16.25 11.25H7.75C7.336 11.25 7 11.586 7 12C7 12.414 7.336 12.75 7.75 12.75H16.25C16.664 12.75 17 12.414 17 12C17 11.586 16.664 11.25 16.25 11.25Z"
      fill="#222222"
    />
  </svg>
)

export default IconSubtractSquareFilled
