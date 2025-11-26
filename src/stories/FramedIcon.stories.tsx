import React from 'react'
import type { StoryFn } from '@storybook/react'

import { FramedIcon as _FramedIcon } from '../index'
import { TButtonIconPropTypes } from '../components/ButtonIcon/types'
import IconDelete from '../components/SVGIcons/IconDelete'
import {TFramedIconPropTypes} from "../components/FramedIcon/types";

export default {
  title: 'FramedIcon',
  component: _FramedIcon,
  argTypes: {
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' }
    },
    type: {
      options: ['secondary', 'brand-light', 'warning-light', 'danger-light', 'success-light', 'information-light'],
      control: { type: 'radio' }
    }
  }
}

const Template: StoryFn<TFramedIconPropTypes> = (args) => (
  <div>
    <_FramedIcon {...args} />
  </div>
)

export const FramedIcon = Template.bind({})
FramedIcon.args = {
    iconProps: {
        Component: IconDelete ,
        type: 'brand-light'
    }
}
