import React from 'react'
import { Spinner as _Spinner } from '../index'
import { StoryFn } from '@storybook/react'
import { TSpinnerProps } from '../components/Spinner/types'

export default {
  title: 'Spinner',
  component: _Spinner,
  argTypes: {
    mode: {
      options: ['light', 'dark'],
      control: { type: 'radio' }
    },
    type: {
      options: ['primary', 'inverse', 'brand'],
      control: { type: 'radio' }
    },
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' }
    }
  }
}

const Template: StoryFn<TSpinnerProps> = (args) => {
  return <_Spinner {...args} />
}
export const Spinner = Template.bind({})

// @ts-ignore
Spinner.args = {
  mode: 'light',
  type: 'primary',
  size: 'large',
  isFullScreen: true,
  title: 'This is your short title text',
  text: 'The subtitle can be long enough but it’s better to keep it short as users don’t like to read a lot'
}
