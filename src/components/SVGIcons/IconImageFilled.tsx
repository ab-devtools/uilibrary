import React, { ReactElement } from 'react'
import { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconImageFilled = ({
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
    <g id="Size=24, Theme=Filled">
      <path
        id="Shape"
        d="M11.5582 13.6469L11.4746 13.7179L4.54692 20.5186C5.04216 20.8239 5.62551 21 6.25 21H17.75C18.3745 21 18.9578 20.8239 19.4531 20.5186L12.5254 13.7179L12.432 13.6399C12.1705 13.4552 11.8174 13.4576 11.5582 13.6469ZM21 6.25C21 4.45507 19.5449 3 17.75 3H6.25C4.45507 3 3 4.45507 3 6.25V17.75C3 18.3771 3.17758 18.9626 3.4852 19.4592L10.4238 12.6475L10.5592 12.5248C11.3941 11.8273 12.615 11.8293 13.4477 12.5306L13.5762 12.6475L20.5148 19.4592C20.8224 18.9626 21 18.3771 21 17.75V6.25ZM15.25 10.75C14.1454 10.75 13.25 9.85457 13.25 8.75C13.25 7.64543 14.1454 6.75 15.25 6.75C16.3546 6.75 17.25 7.64543 17.25 8.75C17.25 9.85457 16.3546 10.75 15.25 10.75Z"
        fill="#222222"
      />
    </g>
  </svg>
)

export default IconImageFilled
