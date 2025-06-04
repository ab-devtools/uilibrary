import type { ReactElement } from 'react'
import React from 'react'
import type { TCardItemProps } from './types'
import { Text } from '../Text'
import classNames from 'classnames'
import { Image } from '../Image'
export const CardItem = (props: TCardItemProps): ReactElement => {
  const { title, icon, subtitleProps, children, className, image, disabled } = props

  return (
    <div className={classNames('card-item', className)}>
      <div className={'card-item__left flexbox align-items--center'}>
        {image ? (
          <div className={'card-item__image flexbox align-items--center justify-content--center'}>
            <Image imagePath={image} />
          </div>
        ) : icon && icon.Component ? (
          <icon.Component {...icon} />
        ) : null}
        <div
          className={`card-item__content ${
            (image || (icon && icon?.Component)) && 'pl-12'
          }`}
        >
          <Text weight={'semibold'}>{title}</Text>
          <Text type={'tertiary'} className={'flexbox align-items--center mt-2'}>
            <>
              {subtitleProps?.subtitle}
              {subtitleProps?.iconProps && subtitleProps.iconProps.Component ? (
                <subtitleProps.iconProps.Component
                  {...icon}
                  size={'xsmall'}
                  type={'tertiary'}
                  className={'ml-6'}
                />
              ) : null}
            </>
          </Text>
        </div>
      </div>
      {!disabled ? (
        <div className={'card-item__right ml-12'}>{children ? children : null}</div>
      ) : null}
    </div>
  )
}
