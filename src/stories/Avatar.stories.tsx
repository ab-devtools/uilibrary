import React from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import imageFile from '../assets/images/avatar.jpg'
import { Avatar as _Avatar, AvatarGroup as _AvatarGroup } from '../index'
import { TAvatarGroupProps, TAvatarProps } from '../components/Avatar/types'
import type { StoryFn } from '@storybook/react'
import IconPerson from '../components/SVGIcons/IconPerson'

const image = {
  src: imageFile,
  alt: 'my image'
}

export default {
  title: 'Avatar',
  component: _Avatar,
  argTypes: {
    color: {
      options: ['grey', 'orange', 'purple', 'blue', 'green', 'red'],
      control: { type: 'radio' }
    },
    type: {
      options: ['', 'count'],
      control: { type: 'radio' }
    },
    size: {
      options: ['xlarge', 'large', 'medium', 'small', 'xsmall', 'xxsmall'],
      control: { type: 'radio' }
    }
  }
}

const Template: StoryFn<TAvatarProps> = (args) => <_Avatar {...args} />

export const Avatar = Template.bind({})

Avatar.args = {
  initials: 'AG',
  color: 'orange',
  size: 'large',
  iconProps: {
    Component: IconPerson
  },
  isEditable: true,
  imagePath: image.src,
  onAvatarChange: (file: File) => {
    console.log(file)
  }
}

// AvatarGroup
const Avatars = [
  {
    initials: 'G M',
    tooltipContent: 'G M'
  },
  {
    imagePath: image.src,
    tooltipContent: 'AVATAR'
  },
  {
    initials: 'T M',
    tooltipContent: 'T M'
  },
  {
    imagePath: image.src
  },
  {
    initials: 'T M'
  },
  {
    imagePath: image.src
  },
  {
    initials: 'T M'
  },
  {
    imagePath: image.src
  },
  {
    imagePath: image.src,
    tooltipContent: 'AVATAR'
  },
  {
    initials: 'T M',
    tooltipContent: 'T M'
  }
] as TAvatarProps[]

const AvatarGroupTemplate: StoryFn<TAvatarGroupProps> = (args) => {
  return <_AvatarGroup {...args} />
}

export const AvatarGroup = AvatarGroupTemplate.bind({})

AvatarGroup.args = {
  maxCount: 0,
  size: 'medium',
  onAddUser: () => {
    console.log('add user')
  },
  avatarGroup: Avatars
}
