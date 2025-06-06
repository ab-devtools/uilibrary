import type { JSX } from 'react'
import React from 'react'
import type { TSideNavigationPropTypes } from './types'
import classNames from 'classnames'
import { ButtonIcon } from '../ButtonIcon'
import IconPanelRight from '../SVGIcons/IconPanelRight'
import IconPanelLeft from '../SVGIcons/IconPanelLeft'
import { Image } from '../Image'
import { Link } from '../Link'
import { isMobile } from '../../utils/helpers'
import IconDismiss from '../SVGIcons/IconDismiss'

export const SideNavigation = (props: TSideNavigationPropTypes): JSX.Element => {
  const {
    children,
    className = '',
    logo,
    logoClosed,
    logoUrl,
    customLogoComponent: CustomLogoComponent,
    isOpen = false,
    isPined,
    onMouseEnter,
    onMouseLeave,
    onPin,
    onClose
  } = props

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={classNames(
        'side-navigation',
        isOpen ? 'side-navigation--opened' : null,
        !isMobile() && isPined ? 'side-navigation--pin' : null,
        className
      )}
    >
      <header>
        <Link url={logoUrl} className={'side-navigation__logo'}>
          {CustomLogoComponent ? (
            <CustomLogoComponent isOpen={isOpen} />
          ) : (
            <Image imagePath={isOpen ? logo : logoClosed} isBackgroundImage={false} />
          )}
        </Link>
        <ButtonIcon
          iconProps={{
            Component: isMobile() ? IconDismiss : isPined ? IconPanelLeft : IconPanelRight
          }}
          size={'large'}
          className={'side-navigation__btn'}
          onClick={isMobile() ? onClose : onPin}
        />
      </header>
      {children}
    </div>
  )
}
