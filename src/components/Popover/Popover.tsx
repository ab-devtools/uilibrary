import type { JSX } from 'react'
import React, { useEffect, useId, useState } from 'react'
import classNames from 'classnames'
import { useHideOnScroll, useGetTooltipStyles, useOnOutsideClick } from '../../hooks'
import { Text } from '../Text'
import { Link } from '../Link'
import type { TPopoverProps } from './types'

export const Popover = (props: TPopoverProps): JSX.Element | null => {
  const {
    dataId,
    text,
    linkAddons,
    className = '',
    position = 'top-left',
    children,
    elemRef,
    id,
    clicked = false,
    popoverContent,
  } = props

  const [isClicked, setIsClicked] = useState(clicked)
  const [popoverRef, setPopoverRef] = useState<HTMLElement | null>(null)
  const [parent, setElement] = useState<HTMLElement | null>(elemRef || null)

  const { tooltipPosition: popoverPosition, tooltipStyles: popoverStyles } = useGetTooltipStyles({
    elemRef: parent,
    tooltipRef: popoverRef,
    initialPosition: position
  })

  const showMessage = () => setIsClicked(true)
  const hideMessage = () => setIsClicked(false)

  useHideOnScroll(hideMessage)
  useOnOutsideClick(popoverRef, hideMessage, isClicked, useId())

  useEffect(() => {
    if (id) {
      const element = document.getElementById(id.toString())
      setElement(element)
    }
  }, [id])

  useEffect(() => {
    if (parent) {
      parent.addEventListener('click', showMessage)
    }
  }, [parent])



  const renderDefaultContent = () => {
    if (linkAddons) {
      return (
        <Link
          dataId={linkAddons.dataId}
          url={linkAddons.url}
          beforeLink={linkAddons.beforeLink}
          afterLink={linkAddons.afterLink}
          target={linkAddons.target}
          className={'popover__link'}
        >
          {text}
        </Link>
      )
    }

    return (
      <Text dataId={`${dataId}-text`} type="primary" weight="regular" size="small">
        {text}
      </Text>
    )
  }

  const renderCustomContent = () => {
    return <>{popoverContent}</>
  }

  return (
    <>
      {isClicked && (
        <div
          data-id={`${dataId}-content`}
          className={classNames(`popover popover--${popoverPosition}`, className)}
          ref={setPopoverRef}
          style={popoverStyles}
        >
          <div className="popover__inner scrollbar scrollbar--vertical pr-8">
            {popoverContent ? renderCustomContent() : renderDefaultContent()}
          </div>
          <span className="popover__arrow"></span>
        </div>
      )}
      {children}
    </>
  )
}
