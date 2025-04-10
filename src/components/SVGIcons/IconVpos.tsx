import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconVpos = ({
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
    <g>
      <path
        d="M18.4941 4.25C20.2891 4.25 21.7441 5.70508 21.7441 7.5V15.5C21.7441 17.2949 20.2891 18.75 18.4941 18.75H5.49414C3.69921 18.75 2.24414 17.2949 2.24414 15.5L2.24414 7.5C2.24414 5.70507 3.69921 4.25 5.49414 4.25H18.4941ZM20.2441 7.5C20.2441 6.5335 19.4606 5.75 18.4941 5.75L5.49414 5.75C4.52764 5.75 3.74414 6.5335 3.74414 7.5L3.74414 15.5C3.74414 16.4665 4.52764 17.25 5.49414 17.25H18.4941C19.4606 17.25 20.2441 16.4665 20.2441 15.5V7.5ZM0.244141 20C0.244141 19.5858 0.579927 19.25 0.994141 19.25H22.9941C23.4084 19.25 23.7441 19.5858 23.7441 20C23.7441 20.4142 23.4084 20.75 22.9941 20.75H0.994141C0.579927 20.75 0.244141 20.4142 0.244141 20ZM9.06618 9.74183C8.84836 9.5482 8.54746 9.44344 8.23445 9.44343C7.92145 9.44342 7.62055 9.54816 7.40274 9.74178C7.19178 9.92932 7.03718 10.2186 7.03718 10.6408C7.03718 10.846 6.87081 11.0124 6.66556 11.0124C6.46032 11.0124 6.29395 10.846 6.29395 10.6408C6.29395 10.017 6.53155 9.52177 6.90895 9.18629C7.27952 8.85688 7.76309 8.70018 8.23447 8.7002C8.70586 8.70021 9.18943 8.85693 9.55999 9.18634C9.93737 9.52182 10.175 10.017 10.175 10.6408V11.3151H10.8493C11.0545 11.3151 11.2209 11.4815 11.2209 11.6867C11.2209 11.892 11.0545 12.0583 10.8493 12.0583H10.175V12.361H10.8493C11.0545 12.361 11.2209 12.5274 11.2209 12.7326C11.2209 12.9379 11.0545 13.1043 10.8493 13.1043H10.175V13.7786C10.175 13.9838 10.0086 14.1502 9.80336 14.1502C9.59812 14.1502 9.43175 13.9838 9.43175 13.7786V13.1043H8.75743C8.55219 13.1043 8.38581 12.9379 8.38581 12.7326C8.38581 12.5274 8.55219 12.361 8.75743 12.361H9.43175V12.0583H8.75743C8.55219 12.0583 8.38581 11.892 8.38581 11.6867C8.38581 11.4815 8.55219 11.3151 8.75743 11.3151H9.43175V10.6408C9.43175 10.2187 9.27716 9.92937 9.06618 9.74183ZM12.7941 9.45C12.7941 9.20147 12.9956 9 13.2441 9H17.2441C17.4927 9 17.6941 9.20147 17.6941 9.45C17.6941 9.69853 17.4927 9.9 17.2441 9.9H13.2441C12.9956 9.9 12.7941 9.69853 12.7941 9.45ZM12.7941 11.45C12.7941 11.2015 12.9956 11 13.2441 11H17.2441C17.4927 11 17.6941 11.2015 17.6941 11.45C17.6941 11.6985 17.4927 11.9 17.2441 11.9H13.2441C12.9956 11.9 12.7941 11.6985 12.7941 11.45ZM12.7941 13.45C12.7941 13.2015 12.9956 13 13.2441 13H17.2441C17.4927 13 17.6941 13.2015 17.6941 13.45C17.6941 13.6985 17.4927 13.9 17.2441 13.9H13.2441C12.9956 13.9 12.7941 13.6985 12.7941 13.45Z"
        fill="#222222"
      />
    </g>
    <defs>
      <clipPath id="clip0_6193_236">
        <rect width="24" height="24" fill="white" transform="translate(-0.00585938)" />
      </clipPath>
    </defs>
  </svg>
)

export default IconVpos
