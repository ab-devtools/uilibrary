import type { JSX } from 'react'
import React from 'react'
import { motion } from 'framer-motion'
import { Text } from '../../Text'
import { AnimatePresenceWrapper } from '../../../helperComponents/AnimatePresenceWrapper'
import type { TCollapseProps } from '../types'
import classNames from 'classnames'
import IconChevronDown from '../../SVGIcons/IconChevronDown'

export const CollapseItem = (props: TCollapseProps): JSX.Element => {
  const {
    title,
    subtext,
    className,
    isOpen,
    toggle,
    children,
    reverse = false,
    additionalInfo,
    iconProps = { Component: IconChevronDown },
    id
  } = props

  return (
    <div
      className={classNames('collapse', { 'collapse--opened': isOpen }, className)}
      id={`${id || ''}`}
    >
      <div
        className={classNames('collapse__header', { 'collapse__header--reverse': reverse })}
        onClick={toggle}
      >
        {iconProps?.Component ? (
          <iconProps.Component
            size="small"
            type="tertiary"
            className={'collapse__header__icon'}
            {...iconProps}
          />
        ) : null}
        <div className={'collapse__header__inner'}>
          <Text size={'medium'} weight={'semibold'}>
            {title}
          </Text>
          {subtext ? (
            <Text type={'secondary'} className={'mt-8'}>
              {subtext}
            </Text>
          ) : null}
          {additionalInfo ? additionalInfo : null}
        </div>
      </div>
      <AnimatePresenceWrapper initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
          >
            <div className="collapse__content">{children}</div>
          </motion.div>
        )}
      </AnimatePresenceWrapper>
    </div>
  )
}
