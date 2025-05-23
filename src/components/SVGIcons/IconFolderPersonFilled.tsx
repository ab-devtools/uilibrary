import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconFolderPersonFilled = ({
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
      d="M18.6 5.4001H12.678L9.78985 8.43985L9.65644 8.56662C9.37813 8.80526 9.03335 8.95328 8.66865 8.9907L8.48485 9.0001H2.40002V17.4001L2.40641 17.5973C2.50798 19.1623 3.80944 20.4001 5.40002 20.4001H13.2457C13.2151 20.201 13.2 20.0003 13.2 19.8001C13.2 18.2351 14.3984 16.9499 15.9277 16.8123C15.3511 16.1739 15 15.328 15 14.4001C15 12.4119 16.6118 10.8001 18.6 10.8001C19.8522 10.8001 20.9551 11.4394 21.6 12.4094V8.4001L21.5936 8.20285L21.5748 8.009C21.3831 6.53694 20.1243 5.4001 18.6 5.4001ZM9.51889 3.85229C9.24184 3.68782 8.92458 3.6001 8.60002 3.6001H5.40002L5.20277 3.60648C3.63787 3.70805 2.40002 5.00952 2.40002 6.6001V7.8001H8.48485L8.58237 7.79212C8.67844 7.7763 8.76926 7.73731 8.8469 7.67856L8.91985 7.61335L11.262 5.1469L9.68002 3.9601L9.51889 3.85229ZM21 14.4001C21 15.7256 19.9255 16.8001 18.6 16.8001C17.2745 16.8001 16.2 15.7256 16.2 14.4001C16.2 13.0746 17.2745 12.0001 18.6 12.0001C19.9255 12.0001 21 13.0746 21 14.4001ZM22.8 19.8001C22.8 21.2943 21.6 22.8001 18.6 22.8001C15.6 22.8001 14.4 21.3 14.4 19.8001C14.4 18.806 15.2059 18.0001 16.2 18.0001H21C21.9941 18.0001 22.8 18.806 22.8 19.8001Z"
      fill="#222222"
    />
  </svg>
)

export default IconFolderPersonFilled
