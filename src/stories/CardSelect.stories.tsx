import React, { ChangeEvent, useState } from 'react'
import { CardSelectGroup as _CardSelectGroup } from '../components/CardSelect'
import { CardSelect as _CardSelect } from '../components/CardSelect'
import { Popover } from '../components/Popover'
import { CARD_SELECT_TYPES } from '../consts'
import imageFile from '../assets/images/illustrations.svg'
import IconInfo from '../components/SVGIcons/IconInfo'
import IconQuestionCircle from '../components/SVGIcons/IconQuestionCircle'
import type { StoryFn } from '@storybook/react'
import type { TCardSelectGroupProps, TCardSelectProps } from '../components/CardSelect/types'

export default {
  title: 'CardSelect',
  component: _CardSelectGroup,
  argTypes: {
    cardsGroupType: {
      options: [CARD_SELECT_TYPES.cardRadio, CARD_SELECT_TYPES.card],
      control: { type: 'radio' }
    },
    cardsGroupDisable: {
      options: [true, false],
      control: { type: 'radio' }
    }
  }
}

// ============================================================================
// Single CardSelect Stories
// ============================================================================

const SingleCardTemplate: StoryFn<TCardSelectProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState<number | string>('')

  return (
    <div style={{ width: '600px' }}>
      <_CardSelect {...args} value={selectedValue} handleChange={setSelectedValue} />
    </div>
  )
}

export const DefaultCard = SingleCardTemplate.bind({})
DefaultCard.args = {
  type: CARD_SELECT_TYPES.cardRadio,
  cardValue: 'option1',
  illustration: imageFile,
  title: 'Default Card Select',
  subtext: 'This is a subtitle describing the option',
  chips: [
    {
      text: 'Popular',
      color: 'success',
      type: 'filled'
    },
    {
      text: 'Recommended',
      color: 'warning',
      type: 'filled'
    }
  ],
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  disabled: false,
  additionalInfo: [
    {
      key: 'Storage',
      value: '100 GB'
    },
    {
      key: 'Users',
      value: 'Up to 10'
    }
  ]
}

export const CardWithIcon = SingleCardTemplate.bind({})
CardWithIcon.args = {
  type: CARD_SELECT_TYPES.cardRadio,
  cardValue: 'option2',
  icon: {
    Component: IconQuestionCircle
  },
  title: 'Card with Icon',
  subtext: 'Icon instead of illustration',
  description: 'This card uses an icon instead of an illustration image.',
  disabled: false
}

export const CardWithInput = SingleCardTemplate.bind({})
CardWithInput.args = {
  type: CARD_SELECT_TYPES.cardRadio,
  cardValue: 'option3',
  title: 'Card with Input Field',
  subtext: 'Includes an input field',
  description: 'This card includes an input field for additional user input.',
  inputProps: [
    {
      name: 'custom-input',
      label: 'Enter Custom Value',
      placeholder: 'Type here...',
      handleChange: (event: TChangeEventType, value: string) => {
        console.log('Input changed:', event.target.value)
      },
      labelAddons: (
        <Popover
          linkAddons={{ url: '#', beforeLink: 'Learn more' }}
          id="input-tooltip"
          text="Additional information about this field"
          position="top-center"
        >
          <div id="input-tooltip">
            <IconInfo type="information-light" size="xsmall" className={'ml-4 pointer'} />
          </div>
        </Popover>
      )
    }
  ],
  disabled: false
}

export const DisabledCard = SingleCardTemplate.bind({})
DisabledCard.args = {
  type: CARD_SELECT_TYPES.cardRadio,
  cardValue: 'option4',
  title: 'Disabled Card',
  subtext: 'This card is disabled',
  description: 'This card cannot be selected due to disabled state.',
  disabled: true
}

// ============================================================================
// Custom Content Stories
// ============================================================================

const CustomContentTemplate: StoryFn<TCardSelectProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState<number | string>(1)

  return (
    <div style={{ width: '600px' }}>
      <_CardSelect {...args} value={selectedValue} handleChange={setSelectedValue} />
    </div>
  )
}

export const CustomContentCard = CustomContentTemplate.bind({})
CustomContentCard.args = {
  type: CARD_SELECT_TYPES.cardRadio,
  cardValue: 'custom1',
  title: 'Custom Content Card', // Required field
  children: (
    <div style={{ padding: '16px 0' }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>
        Custom Content Card
      </h3>
      <p style={{ margin: '0 0 12px 0', color: '#666' }}>
        This card has completely custom content instead of the default structure.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{ flex: 1, padding: '12px', background: '#f0f0f0', borderRadius: '4px' }}>
          <strong>Feature 1</strong>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}>Description here</p>
        </div>
        <div style={{ flex: 1, padding: '12px', background: '#f0f0f0', borderRadius: '4px' }}>
          <strong>Feature 2</strong>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}>Description here</p>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// CardSelectGroup Stories - Default Content
// ============================================================================

const GroupTemplate: StoryFn<TCardSelectGroupProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState<number | string>(1)

  const defaultCards: TCardSelectProps[] = [
    {
      value: 1,
      title: 'Basic Plan',
      dataId: 'plan-basic',
      icon: {
        Component: IconQuestionCircle
      },
      chips: [
        {
          text: 'Free',
          color: 'success',
          type: 'filled'
        }
      ],
      description:
        'Perfect for individuals and small projects. Includes basic features and community support.',
      disabled: false,
      additionalInfo: [
        {
          key: 'Storage',
          value: '10 GB'
        },
        {
          key: 'Users',
          value: '1 User'
        },
        {
          key: 'Support',
          value: 'Community'
        }
      ]
    },
    {
      value: 2,
      title: 'Professional Plan',
      icon: {
        Component: IconQuestionCircle
      },
      chips: [
        {
          text: 'Popular',
          color: 'warning',
          type: 'filled'
        }
      ],
      description: 'Ideal for growing teams. Includes advanced features and priority support.',
      disabled: false,
      additionalInfo: [
        {
          key: 'Storage',
          value: '100 GB'
        },
        {
          key: 'Users',
          value: 'Up to 10'
        },
        {
          key: 'Support',
          value: 'Email & Chat'
        }
      ],
      inputProps: [
        {
          label: 'Number of users',
          name: 'user-count',
          placeholder: 'Enter number of users',
          handleChange: (event: TChangeEventType, value: string) => {
            console.log('Users:', event.target.value)
          }
        }
      ]
    },
    {
      value: 3,
      title: 'Enterprise Plan',
      icon: {
        Component: IconQuestionCircle
      },
      chips: [
        {
          text: 'Custom',
          color: 'primary',
          type: 'filled'
        }
      ],
      description: 'For large organizations. Custom solutions with dedicated support and SLA.',
      disabled: false,
      additionalInfo: [
        {
          key: 'Storage',
          value: 'Unlimited'
        },
        {
          key: 'Users',
          value: 'Unlimited'
        },
        {
          key: 'Support',
          value: '24/7 Dedicated'
        }
      ]
    }
  ]

  return (
    <div style={{ width: '800px' }}>
      <_CardSelectGroup
        {...args}
        cards={defaultCards}
        name="plan-selection"
        value={selectedValue}
        handleChange={setSelectedValue}
      />
    </div>
  )
}

export const DefaultCardGroup = GroupTemplate.bind({})
DefaultCardGroup.args = {
  cardsGroupType: CARD_SELECT_TYPES.cardRadio,
  cardsGroupDisable: false
}

// ============================================================================
// CardSelectGroup Stories - Custom Content
// ============================================================================

const CustomGroupTemplate: StoryFn<TCardSelectGroupProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState<number | string>('plan-pro')

  const plans = [
    {
      id: 'plan-basic',
      name: 'Basic',
      price: 0,
      features: ['10 GB Storage', '1 User', 'Community Support', 'Basic Analytics'],
      popular: false
    },
    {
      id: 'plan-pro',
      name: 'Professional',
      price: 29,
      features: [
        '100 GB Storage',
        'Up to 10 Users',
        'Priority Support',
        'Advanced Analytics',
        'API Access'
      ],
      popular: true
    },
    {
      id: 'plan-enterprise',
      name: 'Enterprise',
      price: null,
      features: [
        'Unlimited Storage',
        'Unlimited Users',
        '24/7 Dedicated Support',
        'Custom Integrations',
        'SLA Guarantee'
      ],
      popular: false
    }
  ]

  const customCards: TCardSelectProps[] = plans.map((plan) => ({
    id: plan.id,
    cardValue: plan.id,
    title: plan.name, // Required field - using plan name
    children: (
      <div style={{ padding: '20px 0' }}>
        {plan.popular && (
          <div
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              background: '#ffa500',
              color: 'white',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              marginBottom: '12px'
            }}
          >
            MOST POPULAR
          </div>
        )}
        <h3
          style={{
            margin: '0 0 12px 0',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333'
          }}
        >
          {plan.name}
        </h3>
        <div style={{ marginBottom: '16px' }}>
          {plan.price !== null ? (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#333' }}>
                ${plan.price}
              </span>
              <span style={{ fontSize: '16px', color: '#666' }}>/month</span>
            </div>
          ) : (
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
              Custom pricing
            </span>
          )}
        </div>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}
        >
          {plan.features.map((feature, index) => (
            <li
              key={index}
              style={{
                padding: '8px 0',
                fontSize: '14px',
                color: '#555',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    )
  }))

  return (
    <div style={{ width: '900px' }}>
      <_CardSelectGroup
        {...args}
        cards={customCards}
        name="pricing-plan"
        value={selectedValue}
        handleChange={setSelectedValue}
      />
    </div>
  )
}

export const PricingCards = CustomGroupTemplate.bind({})
PricingCards.args = {
  cardsGroupType: CARD_SELECT_TYPES.cardRadio,
  cardsGroupDisable: false
}

// ============================================================================
// CardSelectGroup Stories - Mixed Content
// ============================================================================

const MixedGroupTemplate: StoryFn<TCardSelectGroupProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState<number | string>('standard')

  const mixedCards: TCardSelectProps[] = [
    // Default card
    {
      cardValue: 'standard',
      title: 'Standard Option',
      icon: {
        Component: IconQuestionCircle
      },
      subtext: 'Uses default card structure',
      description:
        'This is a standard card using the default CardSelect structure with all traditional props.',
      chips: [
        {
          text: 'Default',
          color: 'primary',
          type: 'filled'
        }
      ],
      additionalInfo: [
        {
          key: 'Type',
          value: 'Standard'
        }
      ]
    },
    // Custom content card
    {
      cardValue: 'custom',
      title: 'Custom Designed Card', // Required field
      children: (
        <div style={{ padding: '16px 0' }}>
          <div
            style={{
              padding: '4px 8px',
              background: '#e3f2fd',
              color: '#1976d2',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'inline-block',
              marginBottom: '12px'
            }}
          >
            CUSTOM CONTENT
          </div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>
            Custom Designed Card
          </h3>
          <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
            This card uses custom content with a completely different layout and styling.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px'
            }}
          >
            <div
              style={{
                padding: '12px',
                background: '#f5f5f5',
                borderRadius: '8px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>100+</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Features</div>
            </div>
            <div
              style={{
                padding: '12px',
                background: '#f5f5f5',
                borderRadius: '8px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>24/7</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Support</div>
            </div>
          </div>
        </div>
      )
    },
    // Another default card
    {
      cardValue: 'premium',
      title: 'Premium Option',
      icon: {
        Component: IconQuestionCircle
      },
      subtext: 'Another default structure card',
      description:
        'This premium option uses the standard structure again, showing you can mix and match easily.',
      chips: [
        {
          text: 'Premium',
          color: 'warning',
          type: 'filled'
        },
        {
          text: 'Best Value',
          color: 'success',
          type: 'filled'
        }
      ],
      inputProps: [
        {
          label: 'Promo Code',
          name: 'promo-code',
          placeholder: 'Enter code',
          handleChange: (e: TChangeEventType, value: string) => {
            return console.log('Promo code:', e.target.value)
          }
        }
      ]
    }
  ]

  return (
    <div style={{ width: '800px' }}>
      <_CardSelectGroup
        {...args}
        cards={mixedCards}
        name="mixed-selection"
        value={selectedValue}
        handleChange={setSelectedValue}
      />
    </div>
  )
}

export const MixedContentCards = MixedGroupTemplate.bind({})
MixedContentCards.args = {
  cardsGroupType: CARD_SELECT_TYPES.cardRadio,
  cardsGroupDisable: false
}

// ============================================================================
// Advanced Example - Feature Comparison
// ============================================================================

const FeatureComparisonTemplate: StoryFn<TCardSelectGroupProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState<number | string>('tier-2')

  const tiers = [
    {
      id: 'tier-1',
      name: 'Starter',
      features: {
        users: '1-5',
        storage: '10 GB',
        bandwidth: '100 GB/mo',
        support: 'Email',
        sla: 'None',
        customBranding: false
      }
    },
    {
      id: 'tier-2',
      name: 'Business',
      features: {
        users: '5-50',
        storage: '100 GB',
        bandwidth: '1 TB/mo',
        support: 'Email & Chat',
        sla: '99.9%',
        customBranding: true
      },
      recommended: true
    },
    {
      id: 'tier-3',
      name: 'Enterprise',
      features: {
        users: 'Unlimited',
        storage: 'Unlimited',
        bandwidth: 'Unlimited',
        support: '24/7 Phone',
        sla: '99.99%',
        customBranding: true
      }
    }
  ]

  const comparisonCards: TCardSelectProps[] = tiers.map((tier) => ({
    id: tier.id,
    cardValue: tier.id,
    title: `${tier.name} Tier`, // Required field
    children: (
      <div style={{ padding: '20px 0' }}>
        {tier.recommended && (
          <div
            style={{
              padding: '4px 12px',
              background: '#4caf50',
              color: 'white',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 'bold',
              display: 'inline-block',
              marginBottom: '12px'
            }}
          >
            RECOMMENDED
          </div>
        )}
        <h3
          style={{
            margin: '0 0 20px 0',
            fontSize: '22px',
            fontWeight: 'bold'
          }}
        >
          {tier.name}
        </h3>
        <table style={{ width: '100%', fontSize: '14px' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', color: '#666' }}>Users</td>
              <td style={{ padding: '8px 0', fontWeight: 'bold', textAlign: 'right' }}>
                {tier.features.users}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', color: '#666' }}>Storage</td>
              <td style={{ padding: '8px 0', fontWeight: 'bold', textAlign: 'right' }}>
                {tier.features.storage}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', color: '#666' }}>Bandwidth</td>
              <td style={{ padding: '8px 0', fontWeight: 'bold', textAlign: 'right' }}>
                {tier.features.bandwidth}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', color: '#666' }}>Support</td>
              <td style={{ padding: '8px 0', fontWeight: 'bold', textAlign: 'right' }}>
                {tier.features.support}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', color: '#666' }}>SLA</td>
              <td style={{ padding: '8px 0', fontWeight: 'bold', textAlign: 'right' }}>
                {tier.features.sla}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', color: '#666' }}>Custom Branding</td>
              <td style={{ padding: '8px 0', textAlign: 'right' }}>
                <span
                  style={{
                    color: tier.features.customBranding ? '#4caf50' : '#999',
                    fontWeight: 'bold'
                  }}
                >
                  {tier.features.customBranding ? '✓' : '✗'}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }))

  return (
    <div style={{ width: '1000px' }}>
      <h2 style={{ marginBottom: '24px' }}>Choose Your Plan</h2>
      <_CardSelectGroup
        {...args}
        cards={comparisonCards}
        name="feature-comparison"
        value={selectedValue}
        handleChange={setSelectedValue}
      />
    </div>
  )
}

export const FeatureComparison = FeatureComparisonTemplate.bind({})
FeatureComparison.args = {
  cardsGroupType: CARD_SELECT_TYPES.cardRadio,
  cardsGroupDisable: false
}

// ============================================================================
// With Action Addons Example
// ============================================================================

const ActionAddonsTemplate: StoryFn<TCardSelectGroupProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState<number | string>('option-1')

  const cardsWithActions: TCardSelectProps[] = [
    {
      cardValue: 'option-1',
      title: 'Card with Action Icon',
      subtext: 'Click the info icon to see more details',
      description: 'This card has an action icon next to the title.',
      actionAddons: {
        icon: {
          Component: IconInfo,
          type: 'information-light',
          size: 'small'
        },
        onClick: () => {
          alert('Action icon clicked for Option 1!')
        }
      }
    },
    {
      cardValue: 'option-2',
      title: 'Another Card with Action',
      subtext: 'This also has an action icon',
      description: 'Each card can have its own action handler.',
      actionAddons: {
        icon: {
          Component: IconQuestionCircle,
          size: 'small'
        },
        onClick: () => {
          alert('Action icon clicked for Option 2!')
        }
      }
    }
  ]

  return (
    <div style={{ width: '700px' }}>
      <_CardSelectGroup
        {...args}
        cards={cardsWithActions}
        name="action-example"
        value={selectedValue}
        handleChange={setSelectedValue}
      />
    </div>
  )
}

export const WithActionAddons = ActionAddonsTemplate.bind({})
WithActionAddons.args = {
  cardsGroupType: CARD_SELECT_TYPES.cardRadio,
  cardsGroupDisable: false
}

// ============================================================================
// Disabled Group Example
// ============================================================================

export const DisabledCardGroup = GroupTemplate.bind({})
DisabledCardGroup.args = {
  cardsGroupType: CARD_SELECT_TYPES.cardRadio,
  cardsGroupDisable: true
}

// ============================================================================
// Title Usage Examples
// ============================================================================

const TitleVariationsTemplate: StoryFn<TCardSelectGroupProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState<number | string>('string-title')

  const titleVariations: TCardSelectProps[] = [
    {
      cardValue: 'string-title',
      title: 'Simple String Title',
      description: 'This card uses a simple string as the title'
    },
    {
      cardValue: 'react-node-title',
      title: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>ReactNode Title</span>
          <span
            style={{
              padding: '2px 8px',
              background: '#4caf50',
              color: 'white',
              fontSize: '11px',
              borderRadius: '4px',
              fontWeight: 'bold'
            }}
          >
            NEW
          </span>
        </div>
      ),
      description: 'This card uses a ReactNode as the title with a badge'
    },
    {
      cardValue: 'custom-with-title',
      title: 'Custom Content with Title',
      children: (
        <div style={{ padding: '16px 0' }}>
          <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
            The title "Custom Content with Title" is required but the custom content below is what's
            displayed:
          </p>
          <div
            style={{
              padding: '12px',
              background: '#e3f2fd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <strong>Custom Content</strong>
            <p style={{ margin: '8px 0 0 0' }}>
              This demonstrates that even with custom content, the title prop is still required.
            </p>
          </div>
        </div>
      )
    },
    {
      cardValue: 'accessible-title',
      title: 'Screen Reader Optimized Title - Enterprise Plan with Unlimited Features',
      children: (
        <div style={{ padding: '16px 0' }}>
          <h3 style={{ margin: '0 0 8px 0' }}>Enterprise</h3>
          <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
            The title prop provides context for screen readers and accessibility tools, even though
            the visual content is custom.
          </p>
        </div>
      )
    }
  ]

  return (
    <div style={{ width: '800px' }}>
      <h2 style={{ marginBottom: '16px' }}>Title Prop Usage Examples</h2>
      <p style={{ marginBottom: '24px', color: '#666' }}>
        The title prop is required for all cards. These examples show different ways to use it.
      </p>
      <_CardSelectGroup
        {...args}
        cards={titleVariations}
        name="title-variations"
        value={selectedValue}
        handleChange={setSelectedValue}
      />
    </div>
  )
}

export const TitleVariations = TitleVariationsTemplate.bind({})
TitleVariations.args = {
  cardsGroupType: CARD_SELECT_TYPES.cardRadio,
  cardsGroupDisable: false
}

// ============================================================================
// Real-world Complete Example
// ============================================================================

const RealWorldTemplate: StoryFn<TCardSelectGroupProps> = (args) => {
  const [selectedPlan, setSelectedPlan] = useState<number | string>('pro')

  interface Plan {
    id: string
    name: string
    tagline: string
    price: number | null
    isPopular: boolean
    features: string[]
    stats: {
      storage: string
      users: string
      support: string
    }
  }

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      tagline: 'Perfect for trying out',
      price: 0,
      isPopular: false,
      features: ['10 GB Storage', 'Up to 3 Users', 'Email Support', 'Basic Analytics'],
      stats: {
        storage: '10 GB',
        users: '3',
        support: 'Email'
      }
    },
    {
      id: 'pro',
      name: 'Professional',
      tagline: 'Most popular choice',
      price: 29,
      isPopular: true,
      features: [
        '100 GB Storage',
        'Up to 20 Users',
        'Priority Support',
        'Advanced Analytics',
        'API Access',
        'Custom Integrations'
      ],
      stats: {
        storage: '100 GB',
        users: '20',
        support: '24/7'
      }
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tagline: 'For large organizations',
      price: null,
      isPopular: false,
      features: [
        'Unlimited Storage',
        'Unlimited Users',
        'Dedicated Support',
        'Custom Development',
        'SLA Guarantee',
        'On-premise Deployment',
        'Training & Onboarding'
      ],
      stats: {
        storage: 'Unlimited',
        users: 'Unlimited',
        support: 'Dedicated'
      }
    }
  ]

  const planCards: TCardSelectProps[] = plans.map((plan) => ({
    id: plan.id,
    cardValue: plan.id,
    title: `${plan.name} Plan - ${plan.tagline}`, // Required: Descriptive title for accessibility
    children: (
      <div style={{ padding: '24px 0' }}>
        {/* Popular Badge */}
        {plan.isPopular && (
          <div
            style={{
              display: 'inline-block',
              padding: '6px 12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}
          >
            ⭐ Most Popular
          </div>
        )}

        {/* Plan Name and Tagline */}
        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              margin: '0 0 4px 0',
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            {plan.name}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              color: '#666',
              fontStyle: 'italic'
            }}
          >
            {plan.tagline}
          </p>
        </div>

        {/* Pricing */}
        <div
          style={{
            marginBottom: '24px',
            paddingBottom: '24px',
            borderBottom: '2px solid #eee'
          }}
        >
          {plan.price !== null ? (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#333' }}>
                ${plan.price}
              </span>
              <span style={{ fontSize: '18px', color: '#666' }}>/month</span>
            </div>
          ) : (
            <div>
              <div
                style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}
              >
                Custom Pricing
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Contact sales for a quote</div>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '24px'
          }}
        >
          <div
            style={{
              textAlign: 'center',
              padding: '12px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}
          >
            <div
              style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}
            >
              {plan.stats.storage}
            </div>
            <div style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase' }}>
              Storage
            </div>
          </div>
          <div
            style={{
              textAlign: 'center',
              padding: '12px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}
          >
            <div
              style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}
            >
              {plan.stats.users}
            </div>
            <div style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase' }}>Users</div>
          </div>
          <div
            style={{
              textAlign: 'center',
              padding: '12px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}
          >
            <div
              style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}
            >
              {plan.stats.support}
            </div>
            <div style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase' }}>
              Support
            </div>
          </div>
        </div>

        {/* Features List */}
        <div>
          <h4
            style={{
              margin: '0 0 12px 0',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            What's Included
          </h4>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}
          >
            {plan.features.map((feature, index) => (
              <li
                key={index}
                style={{
                  padding: '10px 0',
                  fontSize: '14px',
                  color: '#555',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  borderBottom: index < plan.features.length - 1 ? '1px solid #f0f0f0' : 'none'
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#4caf50',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}
                >
                  ✓
                </span>
                <span style={{ flex: 1 }}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }))

  return (
    <div style={{ width: '1100px' }}>
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '32px', fontWeight: 'bold' }}>
          Choose Your Plan
        </h2>
        <p style={{ margin: 0, fontSize: '16px', color: '#666' }}>
          Select the perfect plan for your needs. All plans include a 14-day free trial.
        </p>
      </div>
      <_CardSelectGroup
        {...args}
        cards={planCards}
        name="real-world-pricing"
        value={selectedPlan}
        handleChange={setSelectedPlan}
      />
      <div
        style={{
          marginTop: '24px',
          padding: '16px',
          background: '#f8f9fa',
          borderRadius: '8px',
          textAlign: 'center'
        }}
      >
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          Selected Plan: <strong>{selectedPlan}</strong> | Need help choosing?{' '}
          <a href="#" style={{ color: '#1976d2' }}>
            Contact our sales team
          </a>
        </p>
      </div>
    </div>
  )
}

export const RealWorldPricingExample = RealWorldTemplate.bind({})
RealWorldPricingExample.args = {
  cardsGroupType: CARD_SELECT_TYPES.cardRadio,
  cardsGroupDisable: false
}
