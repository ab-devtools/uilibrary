import type { JSX } from 'react'
import React from 'react'
import { Text } from '../Text'
import { Image } from '../Image'
import { Button } from '../Button'
import type { TEmptyProps } from './types'
import classNames from 'classnames'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import noResultImage from '../../assets/images/no-result.svg'

export const Empty = (props: TEmptyProps): JSX.Element => {
  const {
    size = 'large',
    mainMessage,
    paragraphMessage,
    buttonProps,
    className,
    illustration = noResultImage
  } = props

  return (
    <div
      className={classNames(
        `no-result ${size == 'large' ? 'no-result--large' : 'no-result--small'}`,
        className
      )}
    >
      <div className="no-result__icon">
        <Image imagePath={illustration} />
      </div>
      <div className="no-result__content">
        <Text
            type={'secondary'}
            size={size == 'large' ? 'large' : 'small'}
            weight={size == 'large' ? 'bold' : 'semibold'}
        >
          {mainMessage}
        </Text>
        {paragraphMessage ? (
          <Text size={size == 'large' ? 'small' : 'xsmall'}>{paragraphMessage}</Text>
        ) : null}
        {buttonProps ? <Button {...buttonProps} size="medium" className={'no-result__btn'}/> : null}
      </div>
    </div>
  )
}
