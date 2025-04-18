import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconArrowUpRightFilled = ({
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
    <g id="Direction=Up Right, Size=24, Theme=Filled">
      <path
        id="Shape"
        d="M11 3C10.4477 3 10 3.44772 10 4C10 4.55228 10.4477 5 11 5H17.5857L3.29289 19.2928C2.90237 19.6833 2.90237 20.3164 3.29289 20.707C3.68342 21.0975 4.31658 21.0975 4.70711 20.707L19 6.41408V13C19 13.5523 19.4477 14 20 14C20.5523 14 21 13.5523 21 13V4C21 3.44772 20.5523 3 20 3H11Z"
        fill="#222222"
      />
    </g>
  </svg>
)

export default IconArrowUpRightFilled
