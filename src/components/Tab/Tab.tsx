import type { ReactElement } from 'react'
import React from 'react'
import type { TTabProps } from './types'
import { TabItem } from './TabItem'
import classNames from 'classnames'

export const Tab = (props: TTabProps): ReactElement => {
  const {
    selectedValue,
    tabItems,
    onSelect,
    size,
    className,
    type = 'primary',
    color,
    isLoading,
    ...rest
  } = props

  return (
    <div
      className={classNames(
        'tabs-container',
        `tabs-container--${type}`,
        `${color ? 'tabs-container--' + color : null}`,
        `tabs-container--${size}`,
        {
          'tabs-container--skeleton': isLoading
        },
        className
      )}
    >
      {tabItems.map((tabInfo) => {
        return isLoading ? (
          <div className={'tab-skeleton'} />
        ) : (
          <TabItem
            label={tabInfo.label}
            size={size}
            badgeProps={tabInfo.badgeProps}
            onClick={() => onSelect(tabInfo.value)}
            key={tabInfo.value}
            val={tabInfo.value}
            isSelected={selectedValue === tabInfo.value}
            dataId={tabInfo?.dataId || ''}
            disabled={tabInfo.disabled}
            iconProps={tabInfo.iconProps}
            rightIconProps={tabInfo.rightIconProps}
            {...rest}
          />
        )
      })}
    </div>
  )
}
