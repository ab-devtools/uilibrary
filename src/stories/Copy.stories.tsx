import React from 'react'
import { Copy as _Copy } from '../index'
import { StoryFn } from '@storybook/react'
import { TCopyProps } from '../components/Copy/types'

export default {
  title: 'Copy',
  component: _Copy,
  argTypes: {
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' }
    }
  }
}

const Template: StoryFn<TCopyProps> = (args) => <_Copy {...args} />

export const Copy = Template.bind({})

Copy.args = {
  textAfterCopy: 'Copied'
}
