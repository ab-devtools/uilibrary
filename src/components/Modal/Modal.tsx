import type { ReactElement } from 'react'
import React, { useId, useState } from 'react'
import classnames from 'classnames'
import { motion } from 'framer-motion'
import { AnimatePresenceWrapper } from '../../helperComponents/AnimatePresenceWrapper'
import { useHideBodyScroll, useOnOutsideClick } from '../../hooks'
import { Button } from '../Button'
import { Text } from '../Text'
import type { TModalPropTypes } from './types'
import IconDismiss from '../SVGIcons/IconDismiss'
import { ButtonIcon } from '../ButtonIcon'
import { Tooltip } from '../Tooltip'
import { Positions } from '../Tooltip/types'

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

export const Modal = (props: TModalPropTypes): ReactElement => {
  const {
    isOpen,
    onClose,
    onSubmit,
    title,
    subtitle,
    closeIcon,
    className = '',
    size = 'medium',
    withFooter = true,
    buttonProps,
    children,
    dataIdPrefix,
    closeOnOutsideClick = true,
    confirmBtnTooltipText
  } = props

  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)
  useOnOutsideClick(containerRef, onClose, closeOnOutsideClick && isOpen, useId())
  useHideBodyScroll(isOpen)

  return (
    <AnimatePresenceWrapper>
      {isOpen ? (
        <motion.div
          className={classnames('modal', `modal--${size}`, className)}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="modal__container" ref={setContainerRef} {...DESKTOP_ANIMATION}>
            {title ? (
              <div className="modal__header">
                <div>
                  <Text
                    lineHeight="large"
                    size="large"
                    weight={'bold'}
                    dataId={dataIdPrefix ? `${dataIdPrefix}-modal-title` : ''}
                  >
                    {title}
                  </Text>
                  {subtitle ? (
                    <Text
                      className={'mt-12'}
                      lineHeight={'large'}
                      type={'secondary'}
                      dataId={dataIdPrefix ? `${dataIdPrefix}-modal-title` : ''}
                    >
                      {subtitle}
                    </Text>
                  ) : null}
                </div>
                {closeIcon ? (
                  <ButtonIcon
                    className={'modal__close ml-16'}
                    size={'large'}
                    dataId={dataIdPrefix ? `${dataIdPrefix}-modal-close-button` : ''}
                    iconProps={{ Component: IconDismiss }}
                    onClick={onClose}
                  />
                ) : null}
              </div>
            ) : null}

            <div className="modal__content scrollbar scrollbar--vertical">{children}</div>
            {withFooter && buttonProps ? (
              <div className="modal__footer">
                <Button
                  type="tertiary"
                  className="modal__footer__btn mr-16"
                  onClick={onClose}
                  dataId={dataIdPrefix ? `${dataIdPrefix}-modal-cancel-button` : ''}
                  {...(buttonProps.cancel || {})}
                />
                {confirmBtnTooltipText ? (
                  <Tooltip
                    text={confirmBtnTooltipText as string}
                    id={'confirm-btn-tooltip'}
                    position={Positions.TOP_CENTER}
                  />
                ) : null}
                <Button
                  id={'confirm-btn-tooltip'}
                  className={'modal__footer__btn'}
                  type="primary"
                  onClick={onSubmit}
                  dataId={dataIdPrefix ? `${dataIdPrefix}-modal-confirm-button` : ''}
                  {...buttonProps.confirm}
                />
              </div>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresenceWrapper>
  )
}
