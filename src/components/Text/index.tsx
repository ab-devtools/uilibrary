import React from 'react'
import { TextPropTypes } from './types'
import { noop } from '../../utils'
import './index.scss'

const Text: React.FC<TextPropTypes> = (props: TextPropTypes) => {
  const { text, className = '', type, size, weight, lineHeight, onClick = noop } = props
  return (
    <p
      onClick={onClick}
      className={`body body-${size} color-${type} ${weight} lh-${lineHeight}  ${className}`}
    >
      {text}
    </p>
  )
}

export default Text
