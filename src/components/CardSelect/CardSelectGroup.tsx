import type { JSX } from 'react'
import React from 'react'
import type { TCardSelectGroupProps } from './types'
import { CardSelect } from './CardSelect'
import classNames from 'classnames'

export const CardSelectGroup = (props: TCardSelectGroupProps): JSX.Element => {
  const { cards, name, handleChange, value, cardsGroupType, cardsGroupDisable, className } = props

  return (
    <div className={classNames('card-select-group', className)}>
      {cards.map(
        (
          {
            type,
            illustration,
            icon,
            value: cardValue,
            title,
            subtext,
            description,
            chips,
            inputProps,
            additionalInfo,
            id,
            disabled,
            dataId,
            popoverAddons,
            tooltipAddons,
            actionAddons,
            customContent
          },
          index
        ) => (
          <CardSelect
            dataId={dataId}
            className={'card-select-group__item'}
            name={name}
            key={id || index}
            type={cardsGroupType || type}
            title={title}
            subtext={subtext}
            description={description}
            chips={chips}
            inputProps={inputProps}
            handleChange={handleChange}
            additionalInfo={additionalInfo}
            cardValue={cardValue}
            value={value}
            illustration={illustration}
            icon={icon}
            popoverAddons={popoverAddons}
            tooltipAddons={tooltipAddons}
            actionAddons={actionAddons}
            disabled={cardsGroupDisable || disabled}
            customContent={customContent}
          />
        )
      )}
    </div>
  )
}
