import { Divider } from '../../Divider'
import { Text } from '../../Text'
import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import type { TInfoList } from '../types'

interface TCardAdditionalInfo {
  additionalInfo?: TInfoList | ReactNode
  disabled?: boolean
}

export const CardAdditionalInfo = (props: TCardAdditionalInfo): ReactElement | null => {
  const { additionalInfo, disabled } = props

  if (React.isValidElement(additionalInfo)) {
    return additionalInfo
  }

  if (Array.isArray(additionalInfo) && additionalInfo.length) {
    return (
      <>
        <Divider type={'primary'} isHorizontal={true} className={'mt-16 mb-16'} />
        <div className="card-select__list">
          {additionalInfo.map(({ key, value, id }) => {
            return (
              <div
                key={id}
                className="card-select__list__item flexbox justify-content--between mt-12"
              >
                <Text type={disabled ? 'disabled' : 'secondary'} size={'small'} className={'pr-16'}>
                  {key}
                </Text>
                <Text type={disabled ? 'disabled' : 'primary'} weight={'semibold'}>
                  {value}
                </Text>
              </div>
            )
          })}
        </div>
      </>
    )
  }
  return null
}
