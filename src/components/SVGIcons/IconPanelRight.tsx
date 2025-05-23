import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconPanelRight = ({
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
      d="M8.18506 12.6001L9.38329 13.6485C9.63267 13.8667 9.65794 14.2458 9.43973 14.4952C9.22152 14.7445 8.84246 14.7698 8.59308 14.5516L6.19308 12.4516C6.06287 12.3377 5.98818 12.1731 5.98818 12.0001C5.98818 11.827 6.06287 11.6624 6.19308 11.5485L8.59308 9.44851C8.84246 9.2303 9.22152 9.25557 9.43973 9.50495C9.65794 9.75434 9.63267 10.1334 9.38329 10.3516L8.18504 11.4001L12.5999 11.4001C12.9313 11.4001 13.1999 11.6687 13.1999 12.0001C13.1999 12.3314 12.9313 12.6001 12.5999 12.6001L8.18506 12.6001ZM21.5999 16.8001C21.5999 18.1255 20.5254 19.2001 19.1999 19.2001L4.7999 19.2C3.47442 19.2 2.3999 18.1255 2.3999 16.8V7.20005C2.3999 5.87457 3.47442 4.80005 4.7999 4.80005H19.1999C20.5254 4.80005 21.5999 5.87457 21.5999 7.20005V16.8001ZM19.1999 18.0001C19.8626 18.0001 20.3999 17.4628 20.3999 16.8001L20.3999 7.20005C20.3999 6.53731 19.8626 6.00005 19.1999 6.00005L15.5999 6.00005L15.5999 18.0001H19.1999ZM14.3999 18.0001L14.3999 6.00005L4.7999 6.00005C4.13716 6.00005 3.5999 6.53731 3.5999 7.20005L3.5999 16.8C3.5999 17.4628 4.13716 18 4.7999 18L14.3999 18.0001Z"
      fill="#222222"
    />
  </svg>
)

export default IconPanelRight
