import type { ReactElement } from 'react'
import React from 'react'
import { Text } from '../Text'
import type { TBlock } from './types'
import { Divider } from '../Divider'
import classNames from 'classnames';

export const Block = (props: TBlock): ReactElement => {
  const { children, label, className = '' } = props
  return (
    <div className={classNames('navigation-block', className)}>
      <div className="navigation-block__label">
        <>
          <Text type="tertiary" weight={'semibold'} className={'navigation-block__label__text'}>
            {label}
          </Text>
          <Divider
            type={'primary'}
            isHorizontal={true}
            className={'navigation-block__label__divider'}
          />
        </>
      </div>
      <div className="navigation-block__inner">{children}</div>
    </div>
  )
}
