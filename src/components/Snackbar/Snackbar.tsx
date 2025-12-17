import type { ReactElement } from 'react'
import React from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify'
import type { ToastItem } from 'react-toastify'
import { Text } from '../Text'
import { Button } from '../Button'
import type { TSnackbarProps, TToastProps } from './types'
import { DEFAULT_DURATION, ICONS_MAPPING, TYPE_MAPPING } from './consts'
import { IconDynamicComponent } from '../../helperComponents'
import 'react-toastify/dist/ReactToastify.css'

const CustomToast = ({ actionProps, toastId, type = 'information', text }: TToastProps) => {
  return (
    <div data-id={`${type}-toast-message`} className="snackbar" key={toastId}>
      <div className="snackbar__content">
        <IconDynamicComponent
          componentName={ICONS_MAPPING[type]}
          type={TYPE_MAPPING[type]}
          size="medium"
        />
        <Text className="snackbar__text pl-16 pr-8" type="primary" size="standard" weight="regular">
          {text}
        </Text>
      </div>

      {actionProps ? (
        <Button
          size="small"
          type="tertiary"
          {...actionProps}
          onClick={(e) => {
            toast.dismiss(toastId)
            actionProps?.onClick?.(e)
          }}
        />
      ) : null}
    </div>
  )
}

export const notify = (toastProps: TToastProps): void => {
  const { toastId, closeSnackbar, actionProps, duration = DEFAULT_DURATION, autoClose } = toastProps

  const shouldAutoClose = autoClose !== undefined ? autoClose : !actionProps

  toast(() => CustomToast(toastProps), {
    bodyClassName: '__body',
    className: '_container',
    toastId,
    autoClose: shouldAutoClose ? duration : false
  })

  toast.onChange((payload: ToastItem) => {
    if (payload.status === 'removed') {
      closeSnackbar?.(payload.id)
    }
  })
}

export const Snackbar = (props: TSnackbarProps): ReactElement => {
  const { duration = 1000, position = 'bottom-center' } = props

  return (
    <ToastContainer
      className={'snackbar-wrapper'}
      theme="light"
      hideProgressBar
      transition={Slide}
      position={position}
      autoClose={duration}
      closeButton={() => null}
    />
  )
}
