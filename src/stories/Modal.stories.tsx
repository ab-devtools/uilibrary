import React, { useState } from 'react'
import { Modal as _Modal } from '../index'
import { ModalConfirmation as _ModalConfirmation } from '../index'
import { StoryFn } from '@storybook/react'
import { TModalConfirmationPropTypes, TModalPropTypes } from '../components/Modal/types'
import IconDelete from '../components/SVGIcons/IconDelete'

export default {
  title: 'Modal',
  component: _Modal,
  argTypes: {
    size: {
      options: ['xlarge', 'large', 'medium', 'small'],
      control: { type: 'radio' }
    }
  }
}

const Template: StoryFn<TModalPropTypes> = (args) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)
  return (
    <div>
      <p onClick={openModal}>click here </p>
      <_Modal
        {...args}
        onClose={closeModal}
        isOpen={isOpen}
        onSubmit={() => {
          closeModal()
          console.log('submit')
        }}
        buttonProps={{
          confirm: {
            buttonText: 'Save',
            buttonActionType: 'submit'
          },
          cancel: { buttonText: 'Cancel' }
        }}
        checkProps={{ label: 'Check Label' }}
      >
        <div>Modal content</div>
      </_Modal>
    </div>
  )
}
export const Modal = Template.bind({})

Modal.args = {
  size: 'medium',
  titleProps: {
    title: 'Title',
    size: 'small'
  },
  subtitle: 'Subtitle',
  closeIcon: true,
  confirmBtnTooltipText: 'Confirm'
}

const ModalConfirmationTemplate: StoryFn<TModalConfirmationPropTypes> = (args) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)
  return (
    <div>
      <p onClick={openModal}>click here </p>
      <_ModalConfirmation
        {...args}
        iconProps={{
          Component: IconDelete,
          type: 'warning'
        }}
        onClose={closeModal}
        isOpen={isOpen}
        onSubmit={() => {
          closeModal()
          console.log('submit')
        }}
        buttonProps={{
          confirm: {
            buttonText: 'Delete the card',
            buttonActionType: 'submit'
          },
          deactivate: { buttonText: 'Deactivate' },
          cancel: { buttonText: 'Cancel', type: 'tertiary' }
        }}
      />
    </div>
  )
}
export const ModalConfirmation = ModalConfirmationTemplate.bind({})

ModalConfirmation.args = {
  size: 'small',
  title: 'Title text',
  subtitle: 'This is your subtitle that will give you more context',
  isFooterInline: true
}
