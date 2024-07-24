import React, { useEffect, useState } from 'react'
import { Button, Snackbar as _Snackbar, notify } from '../index'
import { SVGIcons } from './SVGIcons.stories'

export default {
  title: 'Snackbar',
  component: _Snackbar,
  argTypes: {
    type: {
      options: ['information', 'success', 'error', 'warning'],
      control: { type: 'radio' }
    }
  }
}

const Template = (args) => {
  const [infoMessages, setInfoMessages] = useState<any[]>([])

  const removeMessage = (id: number) => {
    setInfoMessages((_infoMessages: any) =>
      _infoMessages.filter((elem: any) => elem.toastId !== id)
    )
  }

  const addMessage = () => {
    const __id = Math.random()

    setInfoMessages((_infoMessages: any) => [
      ..._infoMessages,
      {
        type: args.type,
        toastId: __id,
        message: `${__id}`,
        closeHandler: () => removeMessage(__id)
      }
    ])
  }

  useEffect(() => {
    if (infoMessages.length) {
      const { toastId, message, type } = infoMessages[infoMessages.length - 1]
      notify({
        text: message,
        type,
        toastId: toastId,
        actionProps: {
          buttonText: 'close',
          onClick: () => {
            removeMessage(toastId)
          }
        },
        closeSnackbar: (_id) => {
          removeMessage(_id)
        }
      })
    }
  }, [infoMessages])

  return (
    <div>
      <>
        <Button buttonText={'notify'} onClick={addMessage} />
        <_Snackbar duration={2000} position="bottom-center" />
      </>
    </div>
  )
}
export const Snackbar = Template.bind({})

Snackbar.args = {
  type: 'information'
}
