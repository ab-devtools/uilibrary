import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconAruba = ({
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
    <g clipPath="url(#clip0_3366_14531)">
      <path
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
        fill="#FFDA44"
      />
      <path
        d="M9.99994 20C13.0308 20 15.7466 18.6514 17.5805 16.5217H2.41943C4.2533 18.6514 6.96904 20 9.99994 20Z"
        fill="#338AF3"
      />
      <path
        d="M20 10C20 4.47719 15.5228 0 10 0C4.47719 0 0 4.47719 0 10C0 10.9026 0.120313 11.7769 0.344492 12.6087H19.6555C19.8797 11.7769 20 10.9026 20 10Z"
        fill="#338AF3"
      />
      <path
        d="M0.794922 13.9131C0.987695 14.3661 1.21305 14.8017 1.46777 15.2174H18.5323C18.787 14.8016 19.0124 14.366 19.2052 13.9131H0.794922Z"
        fill="#338AF3"
      />
      <path
        d="M4.58266 6.30715L2.62891 5.44488L4.58266 4.58262L5.44488 2.62891L6.30711 4.58262L8.26082 5.44488L6.30711 6.30715L5.44488 8.26086L4.58266 6.30715Z"
        fill="#F0F0F0"
      />
      <path
        d="M5.44495 3.70581L5.97741 4.91241L7.18405 5.44495L5.97741 5.97745L5.44495 7.18405L4.91241 5.97745L3.70581 5.44495L4.91241 4.91241L5.44495 3.70581Z"
        fill="#D80027"
      />
    </g>
    <defs>
      <clipPath id="clip0_3366_14531">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export default IconAruba
