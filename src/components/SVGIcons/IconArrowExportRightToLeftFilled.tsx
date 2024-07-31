import React, { ReactElement } from 'react'
import { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconArrowExportRightToLeftFilled = ({
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
    <g id="Direction=RTL, Size=24, Theme=Filled">
      <path
        id="Shape"
        d="M21.2471 4.50391C20.8674 4.50391 20.5536 4.78606 20.5039 5.15214L20.4971 5.25391V18.7525C20.4971 19.1667 20.8329 19.5025 21.2471 19.5025C21.6268 19.5025 21.9406 19.2204 21.9902 18.8543L21.9971 18.7525V5.25391C21.9971 4.83969 21.6613 4.50391 21.2471 4.50391ZM8.7873 6.38704L8.7041 6.29284C8.34358 5.9324 7.77635 5.90473 7.38409 6.20979L7.28989 6.29299L2.29328 11.2906C1.93303 11.651 1.90516 12.2178 2.20979 12.6101L2.29287 12.7043L7.28948 17.7077C7.67974 18.0985 8.3129 18.099 8.70369 17.7087C9.06442 17.3485 9.09254 16.7813 8.78778 16.3888L8.70466 16.2945L5.41607 12.9999L17.9971 13C18.5099 13 18.9326 12.614 18.9903 12.1166L18.9971 12C18.9971 11.4872 18.611 11.0645 18.1137 11.0068L17.9971 11L5.41307 10.9999L8.70425 7.70706C9.0647 7.34654 9.09237 6.7793 8.7873 6.38704L8.7041 6.29284L8.7873 6.38704Z"
        fill="#222222"
      />
    </g>
  </svg>
)

export default IconArrowExportRightToLeftFilled
