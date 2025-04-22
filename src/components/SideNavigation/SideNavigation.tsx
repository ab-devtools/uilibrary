import type { TSideNavigationPropTypes } from './types'
import type { JSX } from 'react'
import React, { useState } from 'react'
import classNames from 'classnames'
import { ButtonIcon } from '../ButtonIcon'
import IconPanelRight from '../SVGIcons/IconPanelRight'
import IconPanelLeft from '../SVGIcons/IconPanelLeft'
import { Image } from '../Image'
import {Link} from "../Link";
import {isMobile} from "../../utils/helpers";
import IconDismiss from "../SVGIcons/IconDismiss";

export const SideNavigation = (props: TSideNavigationPropTypes): JSX.Element => {
  const { children, isOpen = true, setOpen, className = '', logo, logoClosed, logoUrl } = props

  const [isPined, setPined] = useState(true)

  const onMouseEnter = () => {
    if (!isPined) {
      setOpen?.(true)
    }
  }

  const onMouseLeave = () => {
    if (!isPined) {
      setOpen?.(false)
    }
  }

  const onPin = () => {
    setPined(!isPined)
  }
  const onClose = () => {
    setOpen?.(false)
  }

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
          <Image imagePath={isOpen ? logo : logoClosed} isBackgroundImage={false} />
        </Link>
        <ButtonIcon
          iconProps={{ Component: isMobile() ? IconDismiss :
                                  isPined ? IconPanelLeft : IconPanelRight }}
          size={'large'}
          className={'side-navigation__btn'}
          onClick={isMobile() ? onClose : onPin}
        />
      </header>
      {children}
    </div>
  )
}
