import React, { useState } from 'react'
import { Input as _Input, InputPassword as _InputPassword, Popover } from '../index'
import IconInfo from '../components/SVGIcons/IconInfo'
import { StoryFn } from '@storybook/react'
import { InputCustomProps } from '../components/Input/types'
import type { InputPasswordsProps } from '../components/Input/types'
import IconCalendarRight from '../components/SVGIcons/IconCalendarRight'
import { Positions } from '../components/Tooltip/types'
import type { TChangeEventType } from '../types/globalTypes'

export default {
  title: 'Input',
  component: _Input,
  argTypes: {
    size: {
      options: ['large', 'small'],
      control: { type: 'radio' }
    }
  }
}

const passwordValidations = [
  { label: '8+ characters', test: (pwd: string) => pwd.length >= 8 },
  { label: 'Uppercase', test: (pwd: string) => /[A-Z]/.test(pwd) },
  { label: 'Lowercase', test: (pwd: string) => /[a-z]/.test(pwd) },
  { label: 'Number', test: (pwd: string) => /\d/.test(pwd) },
  { label: 'Symbol', test: (pwd: string) => /[^a-zA-Z0-9]/.test(pwd) }
]

const Template: StoryFn<InputCustomProps> = (args) => {
  const [value, setValue] = useState('')
  const [isErrorVisible, setIsErrorVisible] = useState(false)
  const changeHandler = (e: TChangeEventType, value: string) => {
    setValue(value)
    setIsErrorVisible(true)
  }

  return (
    <div style={{ maxWidth: 300 }}>
      <_Input
        {...args}
        type={'text'}
        error={!value && isErrorVisible ? 'requeired field' : ''}
        currentValue={value}
        handleChange={changeHandler}
      />
    </div>
  )
}

export const Input = Template.bind({})

const InputPasswordTemplate: StoryFn<InputPasswordsProps> = (args) => {
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)
  const tooltipAddons = !showPassword
    ? {
        id: 'test',
        text: 'Show',
        position: Positions.TOP_CENTER,
        timer: 1000
      }
    : {
        id: 'test',
        text: 'hide',
        position: Positions.TOP_CENTER,
        timer: 1000
      }

  const [isCapsLockOn, setCapsLockState] = useState<boolean>(false)
  const [isCapsLockOn1, setCapsLockState1] = useState<boolean>(false)

  return (
    <div style={{ marginLeft: 200, maxWidth: 400 }}>
      <_InputPassword
        {...args}
        className={'mb-24'}
        id="sk,"
        name="pass"
        isCapsLockOn={isCapsLockOn}
        setIsCapsLockOn={setCapsLockState}
        capsLockText={'Caps Lock is On'}
        validations={passwordValidations}
        onValidationChange={setIsPasswordValid}
        label={'Password'}
        placeholder={'Create password'}
        hasError={false}
        tooltipAddons={tooltipAddons}
        onPasswordShow={setShowPassword}
      />
      <_InputPassword
        {...args}
        id="4"
        name="pass-1"
        isCapsLockOn={isCapsLockOn1}
        setIsCapsLockOn={setCapsLockState1}
        capsLockText={'Caps Lock is On'}
        validations={passwordValidations}
        onValidationChange={setIsPasswordValid}
        label={'Password'}
        placeholder={'Create password'}
        hasError={false}
        tooltipAddons={tooltipAddons}
        onPasswordShow={setShowPassword}
      />
    </div>
  )
}
export const InputPassword = InputPasswordTemplate.bind({})

Input.args = {
  type: 'text',
  label: 'Some text',
  size: 'large',
  mask: '',
  maskChar: '',
  leftIconProps: {
    Component: IconInfo
  },
  rightIconProps: {
    Component: IconCalendarRight
  },
  disabled: false,
  required: true,
  maxCount: 15,
  witUpperCase: false,
  placeholder: 'Some text',
  labelAddons: (
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
  ),
  helperText: 'This is your helper text',
  successMessage: 'Success message'
}

InputPassword.args = {
  size: 'large'
}
