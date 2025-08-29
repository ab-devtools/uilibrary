import React from 'react'
import { OneTimePassword as _OneTimePassword } from '../index'
import { StoryFn } from '@storybook/react'
import { OtpCustomProps } from '../components/OneTimePassword/types'

export default {
  title: 'OneTimePassword',
  component: _OneTimePassword,
  argTypes: {
    type: {
      options: ['text', 'password', 'number'],
      control: { type: 'radio' }
    },
    size: {
      options: ['large', 'small'],
      control: { type: 'radio' }
    },
    hasError: {
      options: [true, false],
      control: { type: 'radio' }
    },
    autoFocus: {
      options: [true, false],
      control: { type: 'radio' }
    }
  }
}

const Template: StoryFn<OtpCustomProps> = (args) => {
  return <_OneTimePassword {...args} />
}

export const OneTimePassword = Template.bind({})

// @ts-ignore
OneTimePassword.args = {
  type: 'number',
  size: 'large',
  count: 5,
  label: 'One Time Password',
  hasError: true,
  error: 'error text',
  successMessage: 'Success text',
  autoFocus: false
}
