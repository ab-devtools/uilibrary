import type { ReactElement } from 'react'
import React from 'react'
import { Text } from '../Text'
import type { TCardSelectProps } from './types'
import classNames from 'classnames'
import { CardAdditionalInfo, CardChips, CardDescription, CardInput } from './components'
import { CARD_SELECT_TYPES } from '../../consts'
import { Radio } from '../Radio'
import { Image } from '../Image'

export const CardSelect = (props: TCardSelectProps): ReactElement => {
  const {
    type = CARD_SELECT_TYPES.cardRadio,
    title,
    description,
    inputProps,
    chips = [],
    disabled,
    className,
    additionalInfo,
    handleChange,
    name,
    setFieldValue,
    value,
    cardValue,
    illustration,
    icon,
    dataId
  } = props
  const selected = cardValue === value
  const cardSelectStyle = classNames(
    `card-select ${disabled ? 'card-select--disabled' : selected ? 'card-select--selected' : ''}`,
    className
  )
  const handleCardSelectValue = (selected: number | string) => {
    if (name && setFieldValue) {
      setFieldValue(name, selected, { shouldValidate: true })
    }
    handleChange?.(selected)
  }

  const handleCardSelect = () => {
    if (cardValue) {
      handleCardSelectValue(cardValue)
    }
  }

  return (
    <div className={cardSelectStyle} onClick={handleCardSelect} data-id={dataId}>
      {illustration ? (
        <div className={'card-select__image mr-16'}>
          <Image imagePath={illustration} />
        </div>
      ) : icon && icon.Component ? (
        <div className={'card-select__icon mr-16'}>
          <icon.Component {...icon} />
        </div>
      ) : null}
      <div className={'card-select__content'}>
        <div className="flexbox justify-content--between align-items--start">
          <Text type={disabled ? 'disabled' : 'primary'} size={'medium'} weight={'bold'}>
            <>{title}</>
          </Text>
          {type === CARD_SELECT_TYPES.cardRadio ? (
            <Radio name={name} isSelected={selected} disabled={disabled} className={'ml-16'} />
          ) : null}
        </div>
        {chips.length ? <CardChips chips={chips} disabled={disabled} /> : null}
        <CardInput inputProps={inputProps} disabled={disabled} />
        <CardDescription description={description} disabled={disabled} />
        <CardAdditionalInfo additionalInfo={additionalInfo} disabled={disabled} />
      </div>
    </div>
  )
}
