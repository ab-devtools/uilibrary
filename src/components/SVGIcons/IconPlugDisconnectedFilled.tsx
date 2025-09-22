import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconPlugDisconnectedFilled = ({
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
      d="M21.7012 3.70711C22.0918 3.31658 22.0918 2.68342 21.7012 2.29289C21.3107 1.90237 20.6776 1.90237 20.287 2.29289L18.4897 4.09027C16.8496 3.06792 14.6641 3.26934 13.2389 4.6945L12.1709 5.76252C11.4875 6.44594 11.4875 7.55398 12.1709 8.2374L15.7567 11.8232C16.4401 12.5066 17.5481 12.5066 18.2315 11.8232L19.2996 10.7552C20.7247 9.33002 20.9261 7.14456 19.9039 5.5045L21.7012 3.70711ZM10.7012 11.7071C11.0918 11.3166 11.0918 10.6834 10.7012 10.2929C10.3107 9.90237 9.67756 9.90237 9.28703 10.2929L7.81737 11.7626L7.52449 11.4697C7.2316 11.1768 6.75672 11.1768 6.46383 11.4697L4.6887 13.2448C3.26356 14.6699 3.06213 16.8554 4.08443 18.4955L2.28703 20.2929C1.89651 20.6834 1.89651 21.3166 2.28703 21.7071C2.67756 22.0976 3.31072 22.0976 3.70125 21.7071L5.49864 19.9097C7.13872 20.932 9.32421 20.7306 10.7494 19.3055L12.5245 17.5303C12.8174 17.2374 12.8174 16.7626 12.5245 16.4697L12.2316 16.1768L13.7012 14.7071C14.0918 14.3166 14.0918 13.6834 13.7012 13.2929C13.3107 12.9024 12.6776 12.9024 12.287 13.2929L10.8174 14.7626L9.23159 13.1768L10.7012 11.7071Z"
      fill="#222222"
    />
  </svg>
)

export default IconPlugDisconnectedFilled
