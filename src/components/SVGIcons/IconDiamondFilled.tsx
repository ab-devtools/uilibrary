import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconDiamondFilled = ({
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
      d="M2.65925 13.5926C1.78057 12.7139 1.78057 11.2893 2.65925 10.4106L10.4109 2.65901C11.2895 1.78033 12.7142 1.78033 13.5929 2.65901L21.3445 10.4106C22.2231 11.2893 22.2231 12.7139 21.3445 13.5926L13.5929 21.3442C12.7142 22.2229 11.2896 22.2229 10.4109 21.3442L2.65925 13.5926Z"
      fill="#222222"
    />
  </svg>
)

export default IconDiamondFilled
