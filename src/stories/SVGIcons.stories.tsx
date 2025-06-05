import { Text } from '../components/Text'
import * as Icons from '../components/SVGIcons'
import { StoryFn } from '@storybook/react'
import { ISVGIconProps } from '../components/SVGIcons/types'

export default {
  title: 'SVG Icons',
  component: null,
  argTypes: {
    size: {
      options: ['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall', 'xxsmall'],
      control: { type: 'select' }
    },
    type: {
      options: [
        'primary',
        'secondary',
        'tertiary',
        'quaternary',
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
      control: { type: 'select' }
    },
    filled: {
      options: ['false', 'true'],
      control: { type: 'select' }
    }
  }
}

const Template: StoryFn<ISVGIconProps & { filled: string }> = (args) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
      {Object.values(Icons)
        .filter((Component) => {
          const isFilledIncluded = Component.name.toLowerCase().includes('filled')
          return args.filled === 'true' ? isFilledIncluded : !isFilledIncluded
        })
        .map((Component, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '10px'
            }}
          >
            <Component {...args} />
            <Text className="mt-8">
              {Component.name
                .replace(/^Icon([A-Z])/g, '$1')
                .replace(/([a-z])([A-Z])/g, '$1-$2')
                .toLowerCase()}
            </Text>
          </div>
        ))}
    </div>
  )
}

export const SVGIcons = Template.bind({})

SVGIcons.args = {
  size: 'medium',
  type: 'primary',
  filled: 'false'
}
