import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconGoogle = ({
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
    <g id="Company=Google, Style=Gray, Background=None" clipPath="url(#clip0_697_1766)">
      <path
        id="Union"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.8426 6.54794C15.6036 5.36623 13.9501 4.72247 12.2392 4.74893C9.10863 4.74893 6.44981 6.86098 5.5018 9.70498V9.70505C4.99913 11.1954 4.99913 12.8092 5.50179 14.2996H5.50619C6.45861 17.1392 9.11303 19.2512 12.2437 19.2512C13.8597 19.2512 15.247 18.8379 16.3223 18.1078V18.1048C17.5878 17.2671 18.452 15.9487 18.721 14.4583H12.2393V9.83734H23.558C23.6991 10.6398 23.7653 11.46 23.7653 12.2757C23.7653 15.9255 22.4609 19.0113 20.1913 21.1013L20.1937 21.1032C18.2051 22.9374 15.4757 24.0001 12.2392 24.0001C7.70204 24.0001 3.55286 21.4427 1.51575 17.3905V17.3905C-0.186243 13.9997 -0.186239 10.0049 1.51576 6.61411H1.51579L1.51575 6.61408C3.55286 2.55749 7.70204 7.62441e-05 12.2392 7.62441e-05C15.22 -0.0351984 18.0992 1.08477 20.2686 3.12188L16.8426 6.54794Z"
        fill="#555555"
      />
    </g>
    <defs>
      <clipPath id="clip0_697_1766">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export default IconGoogle
