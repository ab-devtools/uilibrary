import React from 'react'
import type { StoryFn } from '@storybook/react'

import { FramedIcon as _FramedIcon } from '../index'
import IconDelete from '../components/SVGIcons/IconDelete'
import { TFramedIconPropTypes } from '../components/FramedIcon/types'

export default {
  title: 'FramedIcon',
  component: _FramedIcon,
  argTypes: {
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' },
      description: 'Size of the framed icon'
    },
    'iconProps.type': {
      options: [
        'secondary',
        'warning-light',
        'brand-light',
        'danger-light',
        'success-light',
        'information-light'
      ],
      control: { type: 'radio' },
      description: 'Icon type/variant'
    }
  }
}

const Template: StoryFn<TFramedIconPropTypes> = (args) => {
  const iconType = (args as any)['iconProps.type'] || 'warning-light'

  return (
    <div>
      <_FramedIcon
        {...args}
        iconProps={{
          Component: IconDelete,
          type: iconType
        }}
      />
    </div>
  )
}

export const FramedIcon = Template.bind({})
FramedIcon.args = {
  size: 'medium',
  className: ''
}
