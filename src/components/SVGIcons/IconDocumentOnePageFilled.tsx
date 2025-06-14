import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconDocumentOnePageFilled = ({
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
      d="M17.7499 2.00684C18.9407 2.00684 19.9155 2.932 19.9947 4.10279L19.9999 4.25684V19.7549C19.9999 20.9458 19.0747 21.9205 17.9039 21.9997L17.7499 22.0049H6.25C5.05914 22.0049 4.08436 21.0797 4.00519 19.909L4 19.7549V4.25684C4 3.06597 4.92516 2.09119 6.09595 2.01203L6.25 2.00684H17.7499ZM7.74976 6.99976C7.33554 6.99976 6.99976 7.33554 6.99976 7.74976C6.99976 8.16397 7.33554 8.49976 7.74976 8.49976H16.2498C16.664 8.49976 16.9998 8.16397 16.9998 7.74976C16.9998 7.33554 16.664 6.99976 16.2498 6.99976H7.74976ZM6.99976 11.7498C6.99976 12.164 7.33554 12.4998 7.74976 12.4998H16.2498C16.664 12.4998 16.9998 12.164 16.9998 11.7498C16.9998 11.3355 16.664 10.9998 16.2498 10.9998H7.74976C7.33554 10.9998 6.99976 11.3355 6.99976 11.7498ZM7.74976 14.9998C7.33554 14.9998 6.99976 15.3355 6.99976 15.7498C6.99976 16.164 7.33554 16.4998 7.74976 16.4998H16.2498C16.664 16.4998 16.9998 16.164 16.9998 15.7498C16.9998 15.3355 16.664 14.9998 16.2498 14.9998H7.74976Z"
      fill="#222222"
    />
  </svg>
)

export default IconDocumentOnePageFilled
