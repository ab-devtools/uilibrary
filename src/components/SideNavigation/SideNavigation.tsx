import type { TSideNavigationPropTypes } from './types'
import type { JSX } from 'react'
import React, { useState } from 'react'
import classNames from 'classnames'
import { ButtonIcon } from '../ButtonIcon'
import IconPanelRight from '../SVGIcons/IconPanelRight'
import IconPanelLeft from '../SVGIcons/IconPanelLeft'
import { Image } from '../Image'

export const SideNavigation = (props: TSideNavigationPropTypes): JSX.Element => {
  const { children, isOpen = true, setOpen, className = '', logo, logoClosed } = props

  const [isPined, setPined] = useState(true)

  const onMouseEnter = () => {
    if (isPined) {
      setOpen?.(true)
    }
  }

  const onMouseLeave = () => {
    if (isPined) {
      setOpen?.(false)
    }
  }

  const onPin = () => {
    setPined(!isPined)
  }

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={classNames(
        'side-navigation',
        isOpen ? 'side-navigation--opened' : null,
        isPined ? 'side-navigation--pin' : null,
        className
      )}
    >
      <div className="side-navigation__header">
        <Image imagePath={isOpen ? logo : logoClosed} isBackgroundImage={false} />
        <ButtonIcon
          iconProps={{ Component: isPined ? IconPanelRight : IconPanelLeft }}
          size={'large'}
          className={'side-navigation__btn'}
          onClick={onPin}
        />
      </div>
      {children}
    </div>
  )
}
