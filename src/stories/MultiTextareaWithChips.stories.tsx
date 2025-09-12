import React, { JSX, useEffect } from 'react'
import * as yup from 'yup'
import type { TChipItem } from '../components/MultiTextareaWithChips'
import { MultiTextareaWithChips } from '../components/MultiTextareaWithChips'
import { FormContainer } from '../components/FormContainer'
import { FormField } from '../components/FormField'
import { Button } from '../components/Button'
import { useFormProps } from '../hooks'

export default {
  title: 'MultiTextareaWithChips',
  component: MultiTextareaWithChips,
  parameters: {
    docs: {
      description: {
        component:
          'A reusable component for inputting multiple values as chips with add/remove functionality.'
      }
    }
  }
}

const hdmChipValidationSchema = yup
  .string()
  .test('hdm-format', 'Invalid HDM serial number format', (value) => {
    if (!value) return false
    const serialNumber = value?.trim()

    if (serialNumber.startsWith('55') && serialNumber.length === 8) {
      return true
    }
    if (serialNumber.startsWith('PB') && serialNumber.length === 13) {
      return true
    }
    if (serialNumber.startsWith('000710') && serialNumber.length === 11) {
      return true
    }
    if (serialNumber.startsWith('00024') && serialNumber.length === 11) {
      return true
    }
    if (serialNumber.startsWith('000024') && serialNumber.length === 12) {
      return true
    }
    if (serialNumber.startsWith('125') && serialNumber.length === 12) {
      return true
    }
    if (
      (serialNumber.startsWith('NCB') || serialNumber.startsWith('NCC')) &&
      serialNumber.length === 12
    ) {
      return true
    }
    if (
      (serialNumber.startsWith('1') || serialNumber.startsWith('2')) &&
      serialNumber.length === 24
    ) {
      return true
    }
    if (
      (serialNumber.startsWith('J97') ||
        serialNumber.startsWith('J99') ||
        serialNumber.startsWith('J9B')) &&
      serialNumber.length === 12
    ) {
      return true
    }
    if (
      (serialNumber.startsWith('0002') || serialNumber.startsWith('00002')) &&
      (serialNumber.length === 11 || serialNumber.length === 12)
    ) {
      return true
    }

    return false
  })

const InsideForm = () => {
  const { reset } = useFormProps()

  useEffect(() => {
    reset?.({
      skills: [{ text: '55000001', hasError: false, errorMessage: '' }]
    })
  }, [])

  return (
    <div>
      <FormField
        name="skills"
        As={(formProps: any) => (
          <div>
            <MultiTextareaWithChips
              formProps={formProps}
              fieldName="skills"
              label="HDM Serial Numbers *"
              placeholder="Type HDM serial number and press Enter"
              chips={formProps.value || []}
              allowCustomValues={true}
              chipValidationSchema={hdmChipValidationSchema}
              chipValidationErrorMessage=""
              allowInvalidChips={true}
              availableOptions={[
                '55000001',
                '55000002',
                '55000003',
                'PB1234567890123',
                'PB9876543210987',
                '0007101234567',
                '0002401234567',
                '00002412345678',
                '125123456789',
                'NCB123456789',
                'NCC987654321',
                '123456789012345678901234',
                '234567890123456789012345',
                'J971234567890',
                'J991234567890',
                'J9B1234567890'
              ]}
              searchPlaceholderText="Search available HDM serial numbers..."
              typeAndEnterPlaceholderText="Type custom HDM serial number and press Enter..."
              noOptionsPlaceholderText="No more HDM serial numbers available"
            />
          </div>
        )}
      />
      <div className="mt-4">
        <Button buttonActionType="submit" type="primary">
          Submit Form
        </Button>
      </div>
    </div>
  )
}

export const SimpleFormUsage = (): JSX.Element => {
  const validationSchema = yup.object({
    skills: yup
      .array()
      .of(
        yup.object({
          text: yup.string().test('hdm-format', 'Invalid HDM serial number format', (value) => {
            if (!value) return false
            const serialNumber = value.trim()
            if (serialNumber.startsWith('55') && serialNumber.length === 8) return true
            if (serialNumber.startsWith('PB') && serialNumber.length === 13) return true
            if (serialNumber.startsWith('000710') && serialNumber.length === 11) return true
            if (serialNumber.startsWith('00024') && serialNumber.length === 11) return true
            if (serialNumber.startsWith('000024') && serialNumber.length === 12) return true
            if (serialNumber.startsWith('125') && serialNumber.length === 12) return true
            if (
              (serialNumber.startsWith('NCB') || serialNumber.startsWith('NCC')) &&
              serialNumber.length === 12
            )
              return true
            if (
              (serialNumber.startsWith('1') || serialNumber.startsWith('2')) &&
              serialNumber.length === 24
            )
              return true
            if (
              (serialNumber.startsWith('J97') ||
                serialNumber.startsWith('J99') ||
                serialNumber.startsWith('J9B')) &&
              serialNumber.length === 12
            )
              return true
            if (
              (serialNumber.startsWith('0002') || serialNumber.startsWith('00002')) &&
              (serialNumber.length === 11 || serialNumber.length === 12)
            )
              return true
            return false
          })
        })
      )
      .test('no-invalid-chips', '', (chips) => {
        if (!chips || chips.length === 0) return true
        return !chips.some((chip: any) => chip.hasError)
      })
  })

  return (
    <div className="max-w-md p-6" style={{ maxWidth: 500, padding: 20 }}>
      <FormContainer
        initialValues={{ skills: [] }}
        validationScheme={validationSchema}
        onSubmit={(values, props) => {
          console.log('values', values)
        }}
      >
        <InsideForm />
        <FormStatus />
      </FormContainer>
    </div>
  )
}

const FormStatus = (): JSX.Element | null => {
  const { errors, isSubmitted, getValues } = useFormProps()
  const values = getValues?.() as any
  const skills = values?.skills as any[] | undefined
  const hasNoValues = !Array.isArray(skills) || skills.length === 0

  if (!isSubmitted) return null

  if (!errors?.skills && !hasNoValues) {
    return (
      <div className="mt-3">
        <div style={{ color: 'green', marginBottom: '8px' }}>✅ Form submitted successfully!</div>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
          Submitted Values:
        </div>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          {skills.map((skill: any, index: number) => {
            const text = typeof skill === 'string' ? skill : skill.text
            const hasError = typeof skill === 'object' && skill.hasError
            return (
              <li key={index} style={{ color: hasError ? 'red' : 'black', marginBottom: '2px' }}>
                {text} {hasError && '(Invalid)'}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return <div className="mt-3" style={{ color: 'red' }}></div>
}
