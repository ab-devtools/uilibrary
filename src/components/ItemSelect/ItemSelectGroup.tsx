import type { JSX } from 'react'
import React from 'react'
import type { TItemSelectGroupProps } from './types'
import { ItemSelect } from './ItemSelect'
import classnames from 'classnames'

export const ItemSelectGroup = (props: TItemSelectGroupProps): JSX.Element => {
  const { items, name, value, isHorizontal, handleChange, className, iconGroup } = props
  return (
    <div
      className={classnames(
        'item-select-group',
        {
          'item-select-group--horizontal': isHorizontal
        },
        className
      )}
    >
      {items.map(
        (
          {
            value: itemValue,
            title,
            subtitle,
            image,
            leftIconProps,
            rightContent,
            id,
            disabled,
            deSelectable
          },
          index
        ) => {
          return (
            <ItemSelect
              name={name}
              key={id || index}
              title={title}
              subtitle={subtitle}
              image={image}
              rightIconProps={iconGroup}
              leftIconProps={leftIconProps}
              rightContent={rightContent}
              handleChange={handleChange}
              itemValue={itemValue}
              value={value}
              disabled={disabled}
              deSelectable={deSelectable}
            />
          )
        }
      )}
    </div>
  )
}
