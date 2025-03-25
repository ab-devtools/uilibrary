import type { ReactElement } from 'react'
import React from 'react'
import type { LinkPropTypes } from './types'
import classNames from 'classnames'

export const Link = (props: LinkPropTypes): ReactElement => {
  const {
    type = 'primary',
    weight = 'regular',
    children,
    afterLink,
    beforeLink,
    disabled,
    className = '',
    url,
    dataId = '',
    target,
    iconProps,
    onclick
  } = props

  const isDecorated = beforeLink || afterLink
  const linkClass = classNames(
    'link',
    `link--${disabled ? 'disabled' : type}`,
    weight,
    {
      [`link--icon-${iconProps?.alignment || 'left'}`]: iconProps?.Component && !isDecorated
    },
    className
  )

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    if (onclick) {
      e.preventDefault()
      onclick()
    }
  }

  const linkProps = {
    href: disabled ? undefined : url,
    className: linkClass,
    'data-id': `${dataId}-link`,
    target: disabled ? undefined : target,
    onClick: handleClick
  }

  const linkContent = (
    <>
      {iconProps?.Component && !isDecorated && (
        <iconProps.Component size="small" className="link__icon" />
      )}
      {children}
    </>
  )

  return isDecorated ? (
    <span className={classNames({ 'color-disabled': disabled }, className)}>
      {beforeLink && `${beforeLink} `}
      <a {...linkProps}>{children}</a>
      {afterLink && ` ${afterLink}`}
    </span>
  ) : (
    <a {...linkProps}>{linkContent}</a>
  )
}
