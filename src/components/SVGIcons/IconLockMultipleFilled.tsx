import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconLockMultipleFilled = ({
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
      d="M6.68397 5.36842C6.68397 3.23195 8.46022 1.5 10.6513 1.5C12.8424 1.5 14.6187 3.23195 14.6187 5.36842V6.47368H15.7522C17.1608 6.47368 18.3027 7.58707 18.3027 8.96052V17.25C18.3027 18.6234 17.1608 19.7368 15.7522 19.7368H5.55044C4.14187 19.7368 3 18.6234 3 17.25V8.96052C3 7.58707 4.14187 6.47368 5.55044 6.47368H6.68397V5.36842ZM12.9184 5.36842C12.9184 4.14758 11.9034 3.15789 10.6513 3.15789C9.39926 3.15789 8.38427 4.14758 8.38427 5.36842V6.47368H12.9184V5.36842ZM10.6513 14.4868C11.4339 14.4868 12.0682 13.8683 12.0682 13.1052C12.0682 12.3422 11.4339 11.7237 10.6513 11.7237C9.86879 11.7237 9.23441 12.3422 9.23441 13.1052C9.23441 13.8683 9.86879 14.4868 10.6513 14.4868ZM7.11237 20.8421C7.46249 21.808 8.40721 22.5 9.51768 22.5H16.3189C18.9795 22.5 21.1364 20.3969 21.1364 17.8026V12.829C21.1364 11.7462 20.4267 10.825 19.4361 10.4836V17.8026C19.4361 19.4813 18.0404 20.8421 16.3189 20.8421H7.11237Z"
      fill="#222222"
    />
  </svg>
)

export default IconLockMultipleFilled
