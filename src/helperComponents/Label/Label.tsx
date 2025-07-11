import React from 'react'
import type { LabelPropTypes } from './types'
import classNames from 'classnames';

export const Label: React.FC<LabelPropTypes> = (props: LabelPropTypes) => {
  const {
    text,
    size = 'standard',
    required = false,
    disabled = false,
    className = '',
    labelAddons,
    lineHeight,
    weight,
    type,
    as: As = 'p',
  } = props
  if (!text) {
    return null
  }
  return (
    <As
      size={size}
      weight={'semibold'}
      type={disabled ? 'disabled' : 'primary'}
      className={classNames(
          'label flexbox align-items--start mb-8',
          size && `label-${size}`,
          type && `color-${type}`,
          weight,
          lineHeight && `lh-label-${lineHeight}`,
          className
      )}
    >
      <>
        {text}
        {required ? <sup>*</sup> : null}
        {labelAddons}
      </>
    </As>
  )
}
