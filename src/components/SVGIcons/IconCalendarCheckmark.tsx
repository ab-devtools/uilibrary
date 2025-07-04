import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconCalendarCheckmark = ({
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
      d="M18.6763 3C20.4712 3 21.9263 4.45507 21.9263 6.25V12.0218C21.4631 11.7253 20.9597 11.4858 20.4263 11.3135V8.5H5.42627V17.75C5.42627 18.7165 6.20977 19.5 7.17627 19.5H12.2398C12.4121 20.0335 12.6515 20.5368 12.9481 21H7.17627C5.38134 21 3.92627 19.5449 3.92627 17.75V6.25C3.92627 4.45507 5.38134 3 7.17627 3H18.6763ZM18.6763 4.5H7.17627C6.20977 4.5 5.42627 5.2835 5.42627 6.25V7H20.4263V6.25C20.4263 5.2835 19.6428 4.5 18.6763 4.5ZM23.9263 17.5C23.9263 20.5376 21.4638 23 18.4263 23C15.3887 23 12.9263 20.5376 12.9263 17.5C12.9263 14.4624 15.3887 12 18.4263 12C21.4638 12 23.9263 14.4624 23.9263 17.5ZM21.7798 15.1464C21.5846 14.9512 21.268 14.9512 21.0727 15.1464L17.4263 18.7929L15.7798 17.1464C15.5846 16.9512 15.268 16.9512 15.0727 17.1464C14.8775 17.3417 14.8775 17.6583 15.0727 17.8536L17.0727 19.8536C17.268 20.0488 17.5846 20.0488 17.7798 19.8536L21.7798 15.8536C21.9751 15.6583 21.9751 15.3417 21.7798 15.1464Z"
      fill="#222222"
    />
  </svg>
)

export default IconCalendarCheckmark
