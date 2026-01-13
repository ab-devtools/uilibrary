import React from 'react'
import { Popover, Status as _Status, Text } from '../index'
import IconPerson from '../components/SVGIcons/IconPerson'
import IconInfo from '../components/SVGIcons/IconInfo'
import { StoryFn } from '@storybook/react'
import { TStatusProps } from '../components/Status/types'

export default {
  title: 'Status',
  component: _Status,
  argTypes: {
    type: {
      options: [
        'primary',
        'disabled',
        'brand-light',
        'danger-light',
        'warning-light',
        'success-light',
        'information-light',
        'discovery-light'
      ],
      control: { type: 'radio' }
    },
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' }
    }
  }
}

const Template: StoryFn<TStatusProps> = (args) => {
  return (
    <>
      <_Status {...args} type={'danger-light'}>
        <Text type={'secondary'} size={'small'}>
          Status subtext
        </Text>
      </_Status>
      <_Status {...args} type={'information-light'}>
        <Text type={'information-light'} size={'small'}>
          Status subtext
        </Text>
      </_Status>
    </>
  )
}

export const Status = Template.bind({})

Status.args = {
  text: 'Status text',
  type: 'primary',
  size: 'large',
  withCircle: true,
  leftIconProps: {
    Component: IconPerson
  },
  rightIconProps: (
    <Popover
      linkAddons={{ url: 'link', beforeLink: 'text before link' }}
      id="beneficiary-tooltip"
      text={'data'}
      position="top-center"
    >
      <div id="beneficiary-tooltip">
        <IconInfo type="information-light" size="xsmall" className={'ml-4 pointer'} />
      </div>
    </Popover>
  )
}
