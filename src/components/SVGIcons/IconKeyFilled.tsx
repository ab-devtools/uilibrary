import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconKeyFilled = ({
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
      d="M8.94922 8.59999C8.94922 4.98577 11.885 2.04999 15.4992 2.04999C19.0963 2.04999 22.0492 4.86884 22.0492 8.49999C22.0492 12.1142 19.1134 15.05 15.4992 15.05C14.9689 15.05 14.4451 14.974 13.9484 14.8462C13.9241 15.5151 13.3741 16.05 12.6992 16.05H10.9492V17.8C10.9492 18.4903 10.3896 19.05 9.69922 19.05H7.94922V20.3C7.94922 21.2665 7.16572 22.05 6.19922 22.05H3.69922C2.73272 22.05 1.94922 21.2665 1.94922 20.3V18.1284C1.94922 17.3991 2.23895 16.6996 2.75467 16.1839L8.99046 9.94809C9.04493 9.89362 9.07749 9.80547 9.05969 9.704C8.99939 9.36035 8.94922 8.9872 8.94922 8.59999ZM18.2493 7C18.2493 6.30964 17.6896 5.75 16.9993 5.75C16.3089 5.75 15.7493 6.30964 15.7493 7C15.7493 7.69036 16.3089 8.25 16.9993 8.25C17.6896 8.25 18.2493 7.69036 18.2493 7Z"
      fill="#222222"
    />
  </svg>
)

export default IconKeyFilled
