import type { ReactElement } from 'react'
import React from 'react'
import type { TTabProps } from './types'
import { TabItem } from './TabItem'
import classNames from 'classnames'
import { IconChevronLeft, IconChevronRight } from '../SVGIcons'
import { useTabScroll } from '../../hooks'
import { ButtonIcon } from '../ButtonIcon'

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

  const { containerRef, showLeftArrow, showRightArrow, scrollLeft, scrollRight } = useTabScroll()

  const shouldShowArrows = type === 'tertiary'

  return (
    <div className={classNames('tabs-wrapper', className)}>
      {shouldShowArrows && showLeftArrow && (
        <div className={'tabs-wrapper__arrow tabs-wrapper__arrow--left'}>
          <ButtonIcon iconProps={{ Component: IconChevronLeft }} onClick={scrollLeft} />
        </div>
      )}

      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className={classNames(
          'tabs-container',
          `tabs-container--${type}`,
          `${color ? 'tabs-container--' + color : null}`,
          `tabs-container--${size}`,
          {
            'tabs-container--skeleton': isLoading,
            'tabs-container--scrollable': showLeftArrow || showRightArrow
          }
        )}
      >
        {tabItems.map((tabInfo) => {
          return isLoading ? (
            <div className={'tab-skeleton'} key={tabInfo.value} />
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
              title={tabInfo.title}
              {...rest}
            />
          )
        })}
      </div>

      {shouldShowArrows && showRightArrow && (
        <div className={'tabs-wrapper__arrow tabs-wrapper__arrow--right'}>
          <ButtonIcon iconProps={{ Component: IconChevronRight }} onClick={scrollRight} />
        </div>
      )}
    </div>
  )
}
