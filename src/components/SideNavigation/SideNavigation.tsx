import type { TSideNavigationPropTypes } from './types'
import type { JSX } from 'react'
import React from 'react'
import classNames from 'classnames'
import { ButtonIcon } from '../ButtonIcon'
import IconPanelRight from '../SVGIcons/IconPanelRight'
import IconPanelLeft from '../SVGIcons/IconPanelLeft'
import { Image } from '../Image'

export const SideNavigation = (props: TSideNavigationPropTypes): JSX.Element => {
  const {
    children,
    isOpen = true,
    setOpen,
    pinSidebar = true,
    className = '',
    logo,
    logoClosed
  } = props

  const handleToggleOpen = () => {
    setOpen?.(!isOpen)
  }

  return (
    <div
      className={classNames(
        'side-navigation',
        isOpen ? 'side-navigation--opened' : null,
        pinSidebar ? 'side-navigation--pin' : null,
        className
      )}
    >
      <div className="side-navigation__header">
        <Image imagePath={isOpen ? logo : logoClosed} isBackgroundImage={false} />
        <ButtonIcon
          iconProps={{ Component: pinSidebar ? IconPanelRight : IconPanelLeft }}
          size={'large'}
          className={'side-navigation__btn'}
          onClick={handleToggleOpen}
        />
      </div>
      {children}
    </div>
  )
}
