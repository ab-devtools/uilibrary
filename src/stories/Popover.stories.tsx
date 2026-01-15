import React, { useState } from 'react'
import { Popover as _Popover } from '../components/Popover'
import type { StoryFn } from '@storybook/react'
import type { TPopoverProps } from '../components/Popover/types'
import { Button } from '../components/Button'

export default {
  title: 'Popover',
  component: _Popover,
  argTypes: {
    position: {
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
        'middle-left',
        'middle-right'
      ],
      control: { type: 'radio' }
    }
  }
}

// ============================================================================
// Helper Component for Trigger Element
// ============================================================================
const TriggerBox: React.FC<{ id: string; label?: string }> = ({ id, label = 'Click Me' }) => (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }}
    id={id}

  >
    <Button buttonText={label} />
  </div>
)

// ============================================================================
// Default Popover Stories
// ============================================================================

const Template: StoryFn<TPopoverProps> = (args) => {
  return (
    <div style={{ position: 'relative', height: '600px' }}>
      <_Popover {...args} id="popover-default" />
      <TriggerBox id="popover-default" />
    </div>
  )
}

export const DefaultTextPopover = Template.bind({})
DefaultTextPopover.args = {
  text: 'This is a simple text popover. Click outside or scroll to close it.',
  position: 'top-center'
}

export const PopoverWithLink = Template.bind({})
PopoverWithLink.args = {
  text: 'Learn more about this feature',
  linkAddons: {
    url: 'https://example.com',
    beforeLink: 'Click here to ',
    afterLink: ' for detailed documentation'
  },
  position: 'top-center'
}

export const LongTextPopover = Template.bind({})
LongTextPopover.args = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  position: 'bottom-center'
}

// ============================================================================
// Custom Content Popover Stories
// ============================================================================

const CustomContentTemplate: StoryFn<TPopoverProps> = (args) => {
  return (
    <div style={{ position: 'relative', height: '600px' }}>
      <_Popover {...args} id="popover-custom" />
      <TriggerBox id="popover-custom" label="Custom Content" />
    </div>
  )
}

export const SimpleCustomContent = CustomContentTemplate.bind({})
SimpleCustomContent.args = {
  position: 'top-center',
  popoverContent: (
    <div style={{ padding: '8px' }}>
      <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>
        Custom Popover
      </h4>
      <p style={{ margin: '0', fontSize: '13px', color: '#666' }}>
        This is completely custom content inside the popover.
      </p>
    </div>
  )
}

export const RichContentPopover = CustomContentTemplate.bind({})
RichContentPopover.args = {
  position: 'bottom-center',
  popoverContent: (
    <div style={{ padding: '12px', minWidth: '250px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '12px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          JD
        </div>
        <div>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold' }}>
            John Doe
          </h4>
          <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
            john.doe@example.com
          </p>
        </div>
      </div>
      <div style={{
        padding: '8px',
        background: '#f5f5f5',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#555'
      }}>
        <strong>Role:</strong> Administrator
      </div>
    </div>
  )
}



const PositionTemplate: StoryFn<TPopoverProps> = (args) => {
  const positions: Array<TPopoverProps['position']> = [
    'top-left',
    'top-center',
    'top-right',
    'middle-left',
    'middle-right',
    'bottom-left',
    'bottom-center',
    'bottom-right'
  ]

  return (
    <div style={{
      position: 'relative',
      height: '600px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        padding: '20px'
      }}>
        {positions.map((pos, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <_Popover
              {...args}
              id={`popover-${pos}`}
              position={pos}
              popoverContent={
                <div style={{ padding: '8px' }}>
                  <strong style={{ fontSize: '12px' }}>{pos}</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#666' }}>
                    Position: {pos}
                  </p>
                </div>
              }
            />
            <div
              id={`popover-${pos}`}
              style={{
                padding: '12px 16px',
                background: '#1976d2',
                color: 'white',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 'bold',
                textAlign: 'center',
                userSelect: 'none'
              }}
            >
              {pos}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const AllPositions = PositionTemplate.bind({})
AllPositions.args = {}


