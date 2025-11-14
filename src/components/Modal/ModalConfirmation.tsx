import type { ReactElement } from 'react'
import React, { useId, useState } from 'react'
import classnames from 'classnames'
import { motion } from 'framer-motion'
import { AnimatePresenceWrapper } from '../../helperComponents/AnimatePresenceWrapper'
import { useHideBodyScroll, useOnOutsideClick } from '../../hooks'
import { Button } from '../Button'
import { Text } from '../Text'
import type { TModalConfirmationPropTypes } from './types'
import { FramedIcon } from '../FramedIcon'

const DESKTOP_ANIMATION = {
  initial: { opacity: 0.5, scale: 0.65 },
  animate: { opacity: 1, scale: [0.95, 1] },
  exit: {
    opacity: 0,
    scale: 0.7,
    transition: {
      duration: 0.2
    }
  },
  transition: {
    duration: 0.4,
    type: 'spring',
    damping: 55,
    stiffness: 700
  }
}

export const ModalConfirmation = (props: TModalConfirmationPropTypes): ReactElement => {
  const {
    isOpen,
    onClose,
    onSubmit,
    title,
    className = '',
    size = 'small',
    buttonProps,
    isFooterInline = true,
    dataIdPrefix,
    closeOnOutsideClick = true,
    iconProps,
    subtitle,
    children
    // type = 'secondary'
  } = props

  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)
  useOnOutsideClick(containerRef, onClose, closeOnOutsideClick && isOpen, useId())
  useHideBodyScroll(isOpen)

  return (
    <AnimatePresenceWrapper>
      {isOpen ? (
        <motion.div
          className={classnames('modal modal--confirmation', `modal--${size}`, className)}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="modal__container text-center"
            ref={setContainerRef}
            {...DESKTOP_ANIMATION}
          >
            <div className={'modal__content'}>
              {iconProps?.Component ? (
                <FramedIcon className={'modal__icon mb-32'} size={'medium'} iconProps={iconProps} />
              ) : null}
              {title ? (
                <Text
                  weight="bold"
                  size="large"
                  dataId={dataIdPrefix ? `${dataIdPrefix}-modal-title` : ''}
                >
                  {title}
                </Text>
              ) : null}
              {subtitle ? <Text className={'mt-12'}>{subtitle}</Text> : null}
              {children ? <div className={'mt-32'}>{children}</div> : null}
              {buttonProps ? (
                <div
                  className={`modal__footer mt-32 ${
                    isFooterInline ? 'modal__footer-inline' : 'modal__footer-block'
                  }`}
                >
                  {buttonProps?.cancel ? (
                    <Button
                      type="secondary"
                      className="modal__footer__btn"
                      onClick={onClose}
                      dataId={dataIdPrefix ? `${dataIdPrefix}-modal-cancel-button` : ''}
                      {...(buttonProps?.cancel || {})}
                    />
                  ) : null}
                  {buttonProps?.deactivate ? (
                    <Button
                      type="secondary"
                      className={'modal__footer__btn'}
                      onClick={onSubmit}
                      dataId={dataIdPrefix ? `${dataIdPrefix}-modal-confirm-button` : ''}
                      {...buttonProps?.deactivate}
                    />
                  ) : null}
                  {buttonProps?.confirm ? (
                    <Button
                      type="danger"
                      className={'modal__footer__btn'}
                      onClick={onSubmit}
                      dataId={dataIdPrefix ? `${dataIdPrefix}-modal-confirm-button` : ''}
                      {...buttonProps.confirm}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresenceWrapper>
  )
}
