import type { JSX } from 'react'
import React, { useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import classnames from 'classnames'
import { useHideBodyScroll, useOnOutsideClick } from '../../hooks'
import { AnimatePresenceWrapper } from '../../helperComponents/AnimatePresenceWrapper'
import type { TSideSheetPropTypes } from './types'
import { Footer } from './Footer/Footer'
import IconDismiss from '../SVGIcons/IconDismiss'
import { ButtonIcon } from '../ButtonIcon'
import { Tab } from '../Tab'
import { isMobile } from '../../utils/helpers'
import { Divider } from '../Divider'
import { Text } from '../Text'

export const SideSheet = (props: TSideSheetPropTypes): JSX.Element | null => {
  const {
    size = 'small',
    isLoading,
    isOpen,
    onClose,
    onSubmit,
    title,
    topLeftActions,
    topRightActions,
    position = 'right',
    shouldRemoveCallback,
    className = '',
    tabItemsProps,
    footerButtons,
    children,
    closeOnOutsideClick = true,
    checkboxInfo,
    headerContent,
    isWithDivider = false,
    isPositioned = false,
    isBodyHidden = true,
    withOverlay = false
  } = props
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)
  const scrollbarContainerRef = useRef<HTMLDivElement>(null)

  useOnOutsideClick(
    containerRef,
    onClose,
    isOpen && closeOnOutsideClick,
    useId(),
    shouldRemoveCallback
  )

  useHideBodyScroll(isOpen && isBodyHidden)

  const isFromLeft = position === 'left'
  const isFromRight = position === 'right'

  return (
    <AnimatePresenceWrapper>
      {isOpen ? (
        <motion.div
          className={classnames('side-sheet', {
            'side-sheet--positioned': isPositioned || isMobile(),
            'side-sheet--with-overlay': withOverlay || isMobile()
          })}
          initial={{
            opacity: 0,
            ...(!isPositioned && !isMobile() && { width: 'auto' })
          }}
          animate={{
            opacity: 1,
            ...(!isPositioned && !isMobile() && { width: 'auto' })
          }}
          exit={{
            opacity: 0,
            ...(!isPositioned && !isMobile() && { width: 0 }),
            transition: {
              duration: 0.5,
              ease: 'easeInOut'
            }
          }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: 'auto' }}
        >
          <motion.div
            initial={
              isFromLeft
                ? { left: '-100%' }
                : isFromRight
                ? { right: '-100%' }
                : { bottom: '-100%' }
            }
            animate={isFromLeft ? { left: 0 } : isFromRight ? { right: 0 } : { bottom: 0 }}
            exit={{
              ...(isFromLeft
                ? { left: '-100%' }
                : isFromRight
                ? { right: '-100%' }
                : { bottom: '-100%' }),
              transition: {
                duration: 0.5
              }
            }}
            transition={{ duration: 0.5 }}
            className={classnames(
              'side-sheet__container',
              `side-sheet__container--${position}`,
              `side-sheet__container--${size}`,
              className
            )}
            ref={setContainerRef}
          >
            <div className="side-sheet__header">
              <div className="side-sheet__header__top">
                <div className="side-sheet__header__top__left pr-16">
                  <Text className="side-sheet__title" weight="bold" size="large">
                    {title}
                  </Text>
                  {topLeftActions}
                </div>
                <div className="side-sheet__header__top__right">
                  {topRightActions}
                  <ButtonIcon
                    size="medium"
                    iconProps={{ Component: IconDismiss }}
                    onClick={onClose}
                  />
                </div>
              </div>
              {headerContent ? (
                <div className="side-sheet__header__content"> {headerContent} </div>
              ) : null}
              {tabItemsProps?.tabItems ? (
                <Tab
                  type={'primary'}
                  size={'small'}
                  {...tabItemsProps}
                  className={'side-sheet__tabs'}
                />
              ) : null}
              {isWithDivider && <Divider isHorizontal color={'light'} />}
            </div>
            <div
              className="side-sheet__content scrollbar scrollbar--vertical"
              ref={scrollbarContainerRef}
            >
              {typeof children === 'function' ? children({ scrollbarContainerRef }) : children}
            </div>
            {footerButtons ? (
              <Footer
                footerButtons={footerButtons}
                isLoading={isLoading}
                onClose={onClose}
                onSubmit={onSubmit}
                checkboxInfo={checkboxInfo}
              />
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresenceWrapper>
  )
}
