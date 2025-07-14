import React from 'react'
import { Heading as _Heading } from '../index'
import { StoryFn } from '@storybook/react'
import { HeadingPropTypes } from '../components/Heading/types'

export default {
  title: 'Heading',
  component: _Heading,
  argTypes: {
    type: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'radio' }
    },
    color: {
      options: [
        'primary',
        'secondary',
        'tertiary',
        'disabled',
        'inverse',
        'selected',
        'brand',
        'danger',
        'warning',
        'success',
        'information',
        'discovery'
      ],
      control: { type: 'radio' }
    },
    size: {
      options: ['xsmall', 'small', 'standard', 'medium', 'large', 'xlarge'],
      control: { type: 'radio' }
    },
    weight: {
      options: ['regular', 'semibold', 'bold'],
      control: { type: 'radio' }
    }
  }
}

const Template: StoryFn<HeadingPropTypes & { text: string }> = (args) => (
  <_Heading {...args}>
    {args.text} {args.size} {args.weight}
  </_Heading>
)

export const Heading = Template.bind({})
Heading.args = {
  type: 'h1',
  color: 'primary',
  size: 'large',
  weight: 'regular',
  text: 'heading',
  lineHeight: 'xsmall'
}
