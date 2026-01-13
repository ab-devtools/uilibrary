import React, { useState } from 'react'
import { CollapseItem as _CollapseItem, CollapseGroup as _CollapseGroup } from '../index'
import { StoryFn } from '@storybook/react'
import { TCollapseGroupProps, TCollapseProps } from '../components/Collapse/types'
import { Status } from '../components/Status'
import { Chips } from '../components/Chips'
import IconHeart from '../components/SVGIcons/IconHeart'
import IconCaretDownFilled from '../components/SVGIcons/IconCaretDownFilled'

export default {
  title: 'Collapse',
  component: _CollapseItem,
  argTypes: {}
}

const Template: StoryFn<TCollapseProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <_CollapseItem
      {...args}
      isOpen={isOpen}
      toggle={isOpen ? close : open}
      additionalInfo={
        <Status
          type={'success-light'}
          text={'Additional info'}
          size={'medium'}
          rightIconProps={<IconHeart size={'xsmall'} className={'ml-8'} />}
        />
      }
    >
      <div>My Accordion content</div>
    </_CollapseItem>
  )
}

export const CollapseItem = Template.bind({})

CollapseItem.args = {
  title: 'Collapse',
  subtext: 'Sub text',
  reverse: false,
  disabled: false,
  iconProps: { Component: IconCaretDownFilled }
}

const CollapseItems = [
  {
    title: 'collapse1',
    subtext: 'sub text',
    value: 1,
    content: <div>collapse1 content</div>,
    isOpen: true,
    id: 1
  },
  {
    title: 'collapse2',
    additionalInfo: (
      <Chips type={'accent'} color={'success'} size={'small'} text={'Additional info'} />
    ),
    value: 2,
    content: <div style={{ height: 100 }}>collapse2 content</div>,
    isOpen: false,
    id: 2
  },
  {
    title: 'collapse3',
    value: 3,
    content: <div style={{ height: 200 }}>collapse3 content</div>,
    isOpen: false,
    id: 3,
    disabled: true,
    reverse: true,
    iconProps: { Component: IconCaretDownFilled }
  }
]

const Template1: StoryFn<TCollapseGroupProps> = (args: any) => {
  return <_CollapseGroup {...args} items={CollapseItems} />
}

export const CollapseGroup = Template1.bind({})

CollapseGroup.args = {}
