import type { ReactElement } from 'react'
import React, { useState } from 'react'
import classNames from 'classnames'
import type {TActionItemProps, TNavigationLinkPropTypes} from './types'
import { NavigationItemTypes } from './types'
import { Badge } from '../../Badge'
import IconDynamicComponent from '../../../helperComponents/IconDynamicComponent/IconDynamicComponent'
import IconChevronDown from '../../SVGIcons/IconChevronDown'
import {ButtonIcon} from "../../ButtonIcon";
import IconAdd from "../../SVGIcons/IconAdd";
import IconMore from "../../SVGIcons/IconMore";

export const NavigationItem = (props: TNavigationLinkPropTypes): ReactElement => {
  const {
    As,
    type,
    isOpen,
    iconName,
    showBadge,
    expandable = false,
    showAction = false,
    actionElm,
    active = false,
    badgeProps,
    expandIconProps = {
      Component: IconChevronDown,
      size: 'medium'
    },
    children,
    actionsList
  } = props

  const [childOpen, setChildOpen] = useState(false)

  const displayNavigationItem = () => {
    if (type === NavigationItemTypes.HEADER && !isOpen) {
      return null
    }
    return As()
  }

  const displayHeader =
    isOpen && type === NavigationItemTypes.HEADER && showAction && actionElm && actionElm

  return (
    <>
      <div
        className={classNames('navigation-item', `navigation-item--${type}`, `${expandable ? 'navigation-item--expandable' : ''}`)}
        onClick={() => setChildOpen(!childOpen)}
      >
        <div className={classNames('navigation-item__inner', active && 'active')}>
          {expandable || actionsList?.length ?
            <div className={'navigation-item__actions'}>
              {expandable && (
                  <span className={classNames('navigation-item__actions__expand', childOpen && 'opened')}>
                    {expandIconProps.Component && (
                        <expandIconProps.Component
                            size={expandIconProps.size || 'small'}
                            className={'mr-12'}
                        />
                    )}
                </span>
              )}
              {actionsList?.length && (
                  <div className={'navigation-item__actions__right'}>
                    {
                      actionsList.map((item: TActionItemProps, index) => {
                            return <div key={index}><ButtonIcon iconProps={{Component: item.iconProps}} size={'small'}/></div>
                      })
                    }
                  </div>
                )
              }
            </div>
          :null }
          <>
            {displayHeader}
            {displayNavigationItem()}
            {type === NavigationItemTypes.USER && iconName && isOpen && (
              <IconDynamicComponent componentName={iconName} />
            )}
          </>
          {showBadge && badgeProps?.text && isOpen && (
            <Badge
              type={badgeProps?.type}
              text={badgeProps?.text}
              size={badgeProps?.size}
              className={'mr-12'}
            />
          )}

        </div>
        {children && (
          <div className={classNames('navigation-item__child', childOpen && 'active')}>
            {children}
          </div>
        )}
      </div>
    </>
  )
}
