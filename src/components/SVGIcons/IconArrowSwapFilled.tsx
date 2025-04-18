import type { ReactElement } from 'react'
import React from 'react'
import type { ISVGIconProps } from './types'
import classNames from 'classnames'

export const IconArrowSwapFilled = ({
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
      d="M15.2074 2.29154L19.2074 6.28731C19.5681 6.64758 19.5961 7.21473 19.2914 7.60719L19.2082 7.70144L15.2082 11.7067C14.818 12.0975 14.1848 12.0979 13.794 11.7076C13.4333 11.3474 13.4052 10.7801 13.71 10.3877L13.7931 10.2934L16.0837 8.00002L5.5 8.00003C4.98716 8.00003 4.56449 7.61399 4.50673 7.11666L4.5 7.00003C4.5 6.4872 4.88604 6.06453 5.38338 6.00676L5.5 6.00003L16.0907 6.00002L13.7939 3.7065C13.4333 3.34621 13.4052 2.77899 13.7101 2.38654L13.7932 2.29229C14.1535 1.93162 14.7207 1.90359 15.1132 2.2084L15.2074 2.29154L19.2074 6.28731L15.2074 2.29154ZM19.4907 16.8834L19.4975 17C19.4975 17.5129 19.1114 17.9355 18.6141 17.9933L18.4975 18L7.91368 18L10.2075 20.2926C10.5681 20.6529 10.5961 21.2201 10.2913 21.6126L10.2081 21.7068C9.8478 22.0675 9.28058 22.0955 8.88815 21.7906L8.7939 21.7075L4.7939 17.7112C4.43325 17.3509 4.40525 16.7837 4.71009 16.3913L4.79324 16.297L8.79324 12.2933C9.18358 11.9026 9.81674 11.9023 10.2075 12.2926C10.5681 12.6529 10.5961 13.2201 10.2913 13.6126L10.2081 13.7068L7.91768 16L18.4975 16C19.0103 16 19.433 16.3861 19.4907 16.8834L19.4975 17L19.4907 16.8834Z"
      fill="#222222"
    />
  </svg>
)

export default IconArrowSwapFilled
