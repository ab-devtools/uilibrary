import type { ReactElement } from 'react'
import React from 'react'
import type { TBlock } from './types'
import { Divider } from '../Divider'
import classNames from 'classnames'
import { Label } from '../../helperComponents/Label'

export const Block = (props: TBlock): ReactElement => {
  const { children, label, className = '' } = props
  return (
    <div className={classNames('navigation-block', className)}>
      <div className="navigation-block__label">
        <>
          <Label
            type="tertiary"
            size={'small'}
            weight={'semibold'}
            className={'navigation-block__label__text'}
            text={label}
          />
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
