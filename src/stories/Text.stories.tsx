import React from 'react'
import { Text as _Text } from '../index'
import { StoryFn } from '@storybook/react'
import { TextPropTypes } from '../components/Text/types'

export default {
  title: 'Text',
  component: _Text,
  argTypes: {
    type: {
      options: [
        'primary',
        'secondary',
        'tertiary',
        'disabled',
        'inverse',
        'brand-light',
        'brand-dark',
        'danger-light',
        'danger-dark',
        'warning-light',
        'warning-dark',
        'success-light',
        'success-dark',
        'information-light',
        'information-dark',
        'discovery-light',
        'discovery-dark'
      ],
      control: { type: 'radio' }
    },
    size: {
      options: ['xxsmall', 'xsmall', 'small', 'standard', 'medium', 'large'],
      control: { type: 'radio' }
    },
    as: {
      options: ['p', 'span', 'div', 'h1'],
      control: { type: 'radio' }
    },
    weight: {
      options: ['regular', 'semibold', 'bold', 'bolder'],
      control: { type: 'radio' }
    }
  }
}

const Template: StoryFn<TextPropTypes & { text: string }> = (args) => {
  return (
    <div style={{ padding: '20px', backgroundColor: `${args.type == 'inverse' ? '#919191' : ''}` }}>
      <_Text {...args}>{args.text}</_Text>
    </div>
  )
}

export const Text = Template.bind({})
Text.args = {
  type: 'primary',
  as: 'p',
  size: 'standard',
  lineHeight: 'large',
  weight: 'regular',
  text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
}
