import React from 'react'
import type { StoryFn } from '@storybook/react'

import { FramedIcon as _FramedIcon } from '../index'
import { TButtonIconPropTypes } from '../components/ButtonIcon/types'
import IconDelete from '../components/SVGIcons/IconDelete'

export default {
  title: 'FramedIcon',
  component: _FramedIcon,
  argTypes: {
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' }
    }
  }
}

const Template: StoryFn<TButtonIconPropTypes> = (args) => (
  <div>
    <_FramedIcon {...args} iconProps={{ Component: IconDelete, type: 'warning-light' }} />
  </div>
)

export const FramedIcon = Template.bind({})
FramedIcon.args = {}
