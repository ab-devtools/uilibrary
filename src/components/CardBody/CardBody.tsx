import type { JSX } from 'react'
import React from 'react'
import { Text } from '../Text'
import { Image } from '../Image'
import { Button } from '../Button'
import type { TCardBodyProps } from './types'
import classNames from 'classnames'

export const CardBody = (props: TCardBodyProps): JSX.Element => {
  const { title, description, children, buttonProps, className, illustration } = props

  return (
    <div className={classNames('card-body', className)}>
      <div className={'card-body__image'}>
        <Image imagePath={illustration} />
      </div>
      <Text size={'large'} weight="bolder" className={'mt-32'}>
        {title}
      </Text>
      {description ? <Text className={'mt-12'}>{description}</Text> : null}
      {children}
      {buttonProps ? (
        <div className="card-body__buttons mt-32">
            {buttonProps.primary && (
                <Button className="full-width" {...(buttonProps.primary || {})} />
            )}
            {buttonProps.secondary && (
                <Button type="text" className="full-width" {...buttonProps.secondary} />
            )}
        </div>
      ) : null}
    </div>
  )
}
