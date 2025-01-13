import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconEngland = ({
  size,
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
      [className]: className
    })}
    viewBox="0 0 24 24"
    fill="none"
    onClick={onClick}
    ref={refHandler}
    id={id}
    data-id={dataId ? `${dataId}-svg-icon` : ''}
  >
    <g clipPath="url(#clip0_3366_15564)">
      <path
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
        fill="#F0F0F0"
      />
      <path
        d="M19.9154 8.69566H11.3044H11.3044V0.0846484C10.8774 0.0290625 10.4421 0 10 0C9.55793 0 9.12262 0.0290625 8.69566 0.0846484V8.69559V8.69563H0.0846484C0.0290625 9.12262 0 9.55785 0 10C0 10.4421 0.0290625 10.8774 0.0846484 11.3043H8.69559H8.69563V19.9154C9.12262 19.9709 9.55793 20 10 20C10.4421 20 10.8774 19.971 11.3043 19.9154V11.3044V11.3044H19.9154C19.9709 10.8774 20 10.4421 20 10C20 9.55785 19.9709 9.12262 19.9154 8.69566Z"
        fill="#D80027"
      />
    </g>
    <defs>
      <clipPath id="clip0_3366_15564">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export default IconEngland
