import React from 'react'
import { Link as _Link } from '../index'
import { StoryFn } from '@storybook/react'
import { LinkPropTypes } from '../components/Link/types'
import IconChevronDown from '../components/SVGIcons/IconChevronDown'

export default {
  title: 'Link',
  component: _Link,
  argTypes: {
    type: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' }
    },
    weight: {
      options: ['regular', 'semibold'],
      control: { type: 'radio' }
    }
  }
}

const Template: StoryFn<LinkPropTypes> = (args) => {
  return <_Link {...args} />
}

export const Link = Template.bind({})
Link.args = {
  iconProps: {
    Component: IconChevronDown,
    alignment: 'right'
  },
  children: 'Bro',
  url: '/',
  beforeLink: 'Hello ',
  afterLink: ' By',
  disabled: false
}
