import type { ReactElement } from 'react'
import React from 'react'
import type { HeadingPropTypes } from './types'
import { noop } from '../../utils/helpers'
import classNames from 'classnames'

export const Heading = (props: HeadingPropTypes): ReactElement => {
  const {
    children,
    className = '',
    size = 'small',
    color = 'primary',
    lineHeight = size,
    type: As = 'h1',
    weight = 'regular',
    onClick = noop,
    dataId = ''
  } = props

  return (
    <As
      dataid={dataId}
      onClick={onClick}
      className={classNames(
        'heading',
        size && `heading-${size}`,
        weight,
        `lh-heading-${lineHeight}`,
        color && `color-${color}`,
        className
      )}
    >
      {children}
    </As>
  )
}
