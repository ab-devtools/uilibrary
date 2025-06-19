import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconPersonNoteFilled = ({
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
    onClick={onClick}
    ref={refHandler}
    id={id}
    data-id={dataId ? `${dataId}-svg-icon` : ''}
  >
    <path
      d="M10.9941 15C10.9941 14.6493 11.0543 14.3127 11.1649 13.9999H4.24644C3.00442 13.9999 1.99756 15.0068 1.99756 16.2488V17.1688C1.99756 17.7409 2.17596 18.2987 2.50793 18.7646C4.05009 20.9289 6.57305 22.0011 9.99402 22.0011C10.3916 22.0011 10.777 21.9866 11.1502 21.9576C11.049 21.6569 10.9941 21.3349 10.9941 21V15ZM9.99402 2.00464C12.7554 2.00464 14.994 4.24321 14.994 7.00464C14.994 9.76606 12.7554 12.0046 9.99402 12.0046C7.23259 12.0046 4.99402 9.76606 4.99402 7.00464C4.99402 4.24321 7.23259 2.00464 9.99402 2.00464ZM11.9941 15C11.9941 13.8954 12.8896 13 13.9941 13H20.9941C22.0987 13 22.9941 13.8954 22.9941 15V21C22.9941 22.1046 22.0987 23 20.9941 23H13.9941C12.8896 23 11.9941 22.1046 11.9941 21V15ZM14.4941 16C14.218 16 13.9941 16.2239 13.9941 16.5C13.9941 16.7761 14.218 17 14.4941 17H20.4941C20.7703 17 20.9941 16.7761 20.9941 16.5C20.9941 16.2239 20.7703 16 20.4941 16H14.4941ZM14.4941 19C14.218 19 13.9941 19.2239 13.9941 19.5C13.9941 19.7761 14.218 20 14.4941 20H20.4941C20.7703 20 20.9941 19.7761 20.9941 19.5C20.9941 19.2239 20.7703 19 20.4941 19H14.4941Z"
      fill="#222222"
    />
  </svg>
)

export default IconPersonNoteFilled
