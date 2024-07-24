import React, { ReactElement } from 'react'
import {ISVGIconProps} from './types';
import classNames from 'classnames'

export const IconInfoFilled = ({size, type, className = '', onClick, refHandler, id, dataId }: ISVGIconProps): ReactElement => (
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
      <path d="M12.0001 1.99902C17.5238 1.99902 22.0016 6.47687 22.0016 12.0006C22.0016 17.5243 17.5238 22.0021 12.0001 22.0021C6.47638 22.0021 1.99854 17.5243 1.99854 12.0006C1.99854 6.47687 6.47638 1.99902 12.0001 1.99902ZM11.9963 10.2496C11.4834 10.2499 11.061 10.6363 11.0036 11.1336L10.9969 11.2503L11.0005 16.7519L11.0073 16.8685C11.0654 17.3658 11.4884 17.7515 12.0012 17.7512C12.514 17.7509 12.9364 17.3645 12.9939 16.8672L13.0005 16.7505L12.9969 11.249L12.9901 11.1323C12.932 10.635 12.5091 10.2493 11.9963 10.2496ZM12.0005 6.50006C11.3093 6.50006 10.749 7.06038 10.749 7.75158C10.749 8.44277 11.3093 9.0031 12.0005 9.0031C12.6917 9.0031 13.2521 8.44277 13.2521 7.75158C13.2521 7.06038 12.6917 6.50006 12.0005 6.50006Z" fill="#222222"/>
  </svg>
);

export default IconInfoFilled;