import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconLoanFilled = ({
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
      d="M13.7727 2.16955C14.9115 1.57811 16.2012 2.62404 15.925 3.91504L15.5904 5.47903H16.6327C17.7292 5.47903 18.6181 6.40228 18.6181 7.54116C18.6181 8.56752 17.8962 9.41874 16.951 9.57694L19.3251 13.938C21.3354 17.631 18.5981 22.0005 14.5037 22.0005H9.49625C5.40191 22.0005 2.6646 17.631 4.67495 13.938L7.04912 9.57674C6.10452 9.41803 5.38322 8.56709 5.38322 7.54116C5.38322 6.40228 6.2721 5.47903 7.36859 5.47903H8.3601L8.28025 5.18874C7.88487 3.7514 9.13552 2.40837 10.5318 2.77093C11.4278 3.00361 12.3745 2.89567 13.2006 2.46663L13.7727 2.16955ZM15.0091 12.9589C15.2904 12.6652 15.2891 12.1903 15.0064 11.8982C14.7236 11.6061 14.2664 11.6074 13.9852 11.9011L8.82012 17.2948C8.53889 17.5885 8.54012 18.0634 8.82287 18.3555C9.10561 18.6476 9.56281 18.6463 9.84404 18.3526L15.0091 12.9589ZM14.1104 15.941C13.4248 15.941 12.869 16.5183 12.869 17.2304C12.869 17.9426 13.4248 18.5199 14.1104 18.5199C14.7961 18.5199 15.3519 17.9426 15.3519 17.2304C15.3519 16.5183 14.7961 15.941 14.1104 15.941ZM9.88991 11.7396C9.20367 11.7396 8.64735 12.3174 8.64735 13.0302C8.64735 13.743 9.20368 14.3208 9.88991 14.3208C10.5762 14.3208 11.1325 13.743 11.1325 13.0302C11.1325 12.3174 10.5762 11.7396 9.88991 11.7396Z"
      fill="#080808"
    />
  </svg>
)

export default IconLoanFilled
