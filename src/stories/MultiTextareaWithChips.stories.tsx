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

// export const Default = (): JSX.Element => {
//   const [chips, setChips] = React.useState<Array<string | TChipItem>>([])
//
//   const handleAddChip = (chip: string) => {
//     setChips((prev) => [...prev, chip])
//   }
//
//   const handleRemoveChip = (chipToRemove: string) => {
//     setChips((prev) =>
//       prev.filter((chip) => {
//         const chipText = typeof chip === 'string' ? chip : chip.text
//         return chipText !== chipToRemove
//       })
//     )
//   }
//
//   return (
//     <div className="max-w-md p-6" style={{ maxWidth: 500, padding: 20 }}>
//       <MultiTextareaWithChips
//         label="Label"
//         placeholder="Type and press Enter or Comma to add chips"
//         helperText="This is your helper text"
//         chips={chips}
//         onAddChip={handleAddChip}
//         onRemoveChip={handleRemoveChip}
//         allowCustomValues={true}
//       />
//     </div>
//   )
// }

// export const WithInitialChips = (): JSX.Element => {
//   const chips: Array<string | TChipItem> = [
//     { text: 'React', hasError: false },
//     { text: 'TypeScript', hasError: false },
//     { text: 'Tailwind CSS', hasError: false },
//     { text: 'Storybook', hasError: false }
//   ]
//
//   const handleAddChip = (chip: string) => {
//     // Static demo - no state changes
//     console.log('Would add chip:', chip)
//   }
//
//   const handleRemoveChip = (chipToRemove: string) => {
//     // Static demo - no state changes
//     console.log('Would remove chip:', chipToRemove)
//   }
//
//   return (
//     <div className="max-w-md p-6" style={{ maxWidth: 500, padding: 20 }}>
//       <MultiTextareaWithChips
//         label="Skills"
//         placeholder="Add a new skill"
//         helperText="Press Enter or Comma to add new skills"
//         chips={chips}
//         onAddChip={handleAddChip}
//         onRemoveChip={handleRemoveChip}
//         disabled={true}
//       />
//     </div>
//   )
// }

// export const WithLongChips = (): JSX.Element => {
//   const chips: Array<string | TChipItem> = [
//     { text: 'Very long chip text that should wrap to the next line', hasError: false },
//     { text: 'Another extremely long chip text that should wrap to the next line', hasError: false },
//     { text: 'Short', hasError: false },
//     { text: 'Medium length chip text', hasError: false },
//     {
//       text: 'Super duper extra long chip text that definitely needs to wrap to multiple lines',
//       hasError: false
//     }
//   ]
//
//   const handleAddChip = (chip: string) => {
//     // Static demo - no state changes
//     console.log('Would add chip:', chip)
//   }
//
//   const handleRemoveChip = (chipToRemove: string) => {
//     // Static demo - no state changes
//     console.log('Would remove chip:', chipToRemove)
//   }
//
//   return (
//     <div className="max-w-md p-6" style={{ maxWidth: 500, padding: 20 }}>
//       <MultiTextareaWithChips
//         label="Long Text Chips"
//         placeholder="Add a new long text chip"
//         helperText="Test wrapping behavior with long chip text"
//         chips={chips}
//         onAddChip={handleAddChip}
//         onRemoveChip={handleRemoveChip}
//       />
//     </div>
//   )
// }

// export const Disabled = (): JSX.Element => {
//   const chips: Array<string | TChipItem> = [
//     { text: 'Existing Chip 1', hasError: false },
//     { text: 'Existing Chip 2', hasError: false }
//   ]
//
//   const handleAddChip = (chip: string) => {
//     // Static demo - no state changes
//     console.log('Would add chip:', chip)
//   }
//
//   const handleRemoveChip = (chipToRemove: string) => {
//     // Static demo - no state changes
//     console.log('Would remove chip:', chipToRemove)
//   }
//
//   return (
//     <div className="max-w-md p-6" style={{ maxWidth: 500, padding: 20 }}>
//       <MultiTextareaWithChips
//         label="Disabled Component"
//         placeholder="Cannot add new chips"
//         helperText="This component is disabled"
//         chips={chips}
//         onAddChip={handleAddChip}
//         onRemoveChip={handleRemoveChip}
//         disabled={true}
//       />
//     </div>
//   )
// }

// export const WithSearchAndSelect = (): JSX.Element => {
//   const chips: Array<string | TChipItem> = [{ text: 'React', hasError: false }]
//
//   const handleAddChip = (chip: string) => {
//     // Static demo - no state changes
//     console.log('Would add chip:', chip)
//   }
//
//   const handleRemoveChip = (chipToRemove: string) => {
//     // Static demo - no state changes
//     console.log('Would remove chip:', chipToRemove)
//   }
//
//   return (
//     <div className="max-w-md p-6" style={{ maxWidth: 500, padding: 20 }}>
//       <MultiTextareaWithChips
//         label="Skills (Search & Select)"
//         placeholder="Start typing to search skills"
//         searchPlaceholder="Search available skills..."
//         helperText="Type to search and select from available options"
//         chips={chips}
//         onAddChip={handleAddChip}
//         onRemoveChip={handleRemoveChip}
//         availableOptions={[
//           'React',
//           'TypeScript',
//           'JavaScript',
//           'Node.js',
//           'Python',
//           'Java',
//           'C++',
//           'Vue.js',
//           'Angular',
//           'Svelte',
//           'Next.js',
//           'GraphQL',
//           'MongoDB',
//           'PostgreSQL'
//         ]}
//         allowCustomValues={false}
//         searchPlaceholderText="Type to search available skills..."
//         noOptionsPlaceholderText="No skills available to select"
//       />
//     </div>
//   )
// }

// export const WithCustomValuesAllowed = (): JSX.Element => {
//   const chips: Array<string | TChipItem> = [{ text: 'React', hasError: false }]
//
//   const handleAddChip = (chip: string) => {
//     // Static demo - no state changes
//     console.log('Would add chip:', chip)
//   }
//
//   const handleRemoveChip = (chipToRemove: string) => {
//     // Static demo - no state changes
//     console.log('Would remove chip:', chipToRemove)
//   }
//
//   return (
//     <div className="max-w-md p-6" style={{ maxWidth: 500, padding: 20 }}>
//       <MultiTextareaWithChips
//         label="Skills (Custom + Search)"
//         placeholder="Search or type custom skills"
//         searchPlaceholder="Search available skills or type custom ones..."
//         helperText="You can select from available options or add custom skills"
//         chips={chips}
//         onAddChip={handleAddChip}
//         onRemoveChip={handleRemoveChip}
//         availableOptions={['React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java', 'C++']}
//         allowCustomValues={true}
//         searchPlaceholderText="Search skills or type custom ones..."
//         typeAndEnterPlaceholderText="Type a skill and press Enter to add..."
//         noOptionsPlaceholderText="No predefined skills available"
//       />
//     </div>
//   )
// }

// Chip-level Yup validation example (e.g., only valid emails allowed)
// export const WithEmailValidation = (): JSX.Element => {
//   const chips: Array<string | TChipItem> = []
//   const add = (v: string) => {
//     // Static demo - no state changes
//     console.log('Would add email:', v)
//   }
//   const remove = (v: string) => {
//     // Static demo - no state changes
//     console.log('Would remove email:', v)
//   }
//
//   return (
//     <div className="max-w-md p-6" style={{ maxWidth: 500, padding: 20 }}>
//       <MultiTextareaWithChips
//         label="Emails"
//         placeholder="Add email and press Enter"
//         helperText="Only valid email addresses are allowed"
//         chips={chips}
//         onAddChip={add}
//         onRemoveChip={remove}
//         chipValidationSchema={yup.string().email('Please enter a valid email address')}
//         chipValidationErrorMessage="Invalid email format"
//       />
//     </div>
//   )
// }

// Story demonstrating allowInvalidChips with red error chips
// export const WithInvalidChipsAllowed = (): JSX.Element => {
//   const chips: Array<string | TChipItem> = [
//     { text: 'valid@email.com', hasError: false },
//     { text: 'invalid-email', hasError: true, errorMessage: 'Invalid email format' }
//   ]
//
//   const add = (v: string) => {
//     // Static demo - no state changes
//     console.log('Would add email:', v)
//   }
//   const remove = (v: string) => {
//     // Static demo - no state changes
//     console.log('Would remove email:', v)
//   }
//
//   const addItem = (item: TChipItem) => {
//     // Static demo - no state changes
//     console.log('Would add email item:', item)
//   }
//
//   return (
//     <div className="max-w-md p-6" style={{ maxWidth: 500, padding: 20 }}>
//       <MultiTextareaWithChips
//         label="Emails (Allow Invalid)"
//         placeholder="Add email and press Enter"
//         helperText="Invalid emails will be added with red borders but still functional"
//         chips={chips}
//         onAddChip={add}
//         onRemoveChip={remove}
//         onAddChipItem={addItem}
//         allowInvalidChips={true}
//         chipValidationSchema={yup.string().email('Please enter a valid email address')}
//         chipValidationErrorMessage="Invalid email format"
//       />
//     </div>
//   )
// }

// Story demonstrating external form integration

// Story to test performance fix
// export const PerformanceTest = (): JSX.Element => {
//   const chips: Array<string | TChipItem> = [
//     'React',
//     'TypeScript',
//     'JavaScript',
//     'Node.js',
//     'Python'
//   ]
//
//   const handleAddChip = (chip: string) => {
//     // Static demo - no state changes
//     console.log('Would add chip:', chip)
//   }
//
//   const handleRemoveChip = (chipToRemove: string) => {
//     // Static demo - no state changes
//     console.log('Would remove chip:', chipToRemove)
//   }
//
//   return (
//     <div className="max-w-md p-6" style={{ maxWidth: 500, padding: 20 }}>
//       <h3 className="text-lg font-semibold mb-4">Performance Test</h3>
//       <p className="text-sm text-gray-600 mb-4">
//         This tests the performance fix for the useEffect issue
//       </p>
//
//       <MultiTextareaWithChips
//         label="Performance Test"
//         placeholder="Type to test performance"
//         helperText="Add/remove chips to test performance"
//         chips={chips}
//         onAddChip={handleAddChip}
//         onRemoveChip={handleRemoveChip}
//         availableOptions={[
//           'React',
//           'TypeScript',
//           'JavaScript',
//           'Node.js',
//           'Python',
//           'Java',
//           'C++',
//           'Vue.js',
//           'Angular',
//           'Svelte',
//           'Next.js',
//           'GraphQL',
//           'MongoDB',
//           'PostgreSQL'
//         ]}
//         allowCustomValues={true}
//       />
//
//       <div className="mt-4 p-3 bg-green-100 rounded">
//         <p className="text-sm text-green-800">
//           ✅ No console errors should appear when typing or adding/removing chips
//         </p>
//       </div>
//     </div>
//   )
// }

// HDM Serial Number validation schema for chips - validates individual strings
const hdmChipValidationSchema = yup
  .string()
  .test('hdm-format', 'Invalid HDM serial number format', (value) => {
    if (!value) return false
    console.log('dhjshdjshsjhsdjhsjhdjhsjdjs', value)
    const serialNumber = value?.trim()

    // Valid HDM serial number formats
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

// HDM Serial Number validation schema for form - validates the entire form structure
const hdmValidationSchema = yup.object({
  skills: yup.array().of(
    yup.object({
      text: yup.string().test('hdm-format', '', (value) => {
        if (!value) return false
        const serialNumber = value.trim()
        // Valid HDM serial number formats
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
    })
  )
})

// Story demonstrating HDM Serial Number validation
// export const WithHdmSerialNumberValidation = (): JSX.Element => {
//   const handleSubmit = (values: any) => {
//     console.log('Form submitted with values:', values)
//     console.log('HDM Serial Numbers:', values.hdmSerialNumbers)
//   }
//
//   return (
//     <div className="max-w-md p-6" style={{ maxWidth: 500, padding: 20 }}>
//       <FormContainer
//         validationScheme={hdmValidationSchema}
//         initialValues={{ hdmSerialNumbers: [] }}
//         onSubmit={handleSubmit}
//         buttonConfigs={[
//           {
//             buttonText: 'Submit Form',
//             buttonActionType: 'submit',
//             type: 'primary'
//           }
//         ]}
//       >
//         <FormField
//           name="hdmSerialNumbers"
//           As={(formProps: any) => (
//             <MultiTextareaWithChips
//               label="HDM Serial Numbers"
//               placeholder="Enter HDM serial number and press Enter"
//               chips={Array.isArray(formProps.value) ? formProps.value : []}
//               onAddChip={(chip: string) => {
//                 // Simple: just update form value
//                 const currentChips = Array.isArray(formProps.value) ? formProps.value : []
//                 formProps.onChange([...currentChips, { text: chip, hasError: false }])
//               }}
//               onRemoveChip={(chipToRemove: string) => {
//                 // Simple: just update form value
//                 const currentChips = Array.isArray(formProps.value) ? formProps.value : []
//                 const filteredChips = currentChips.filter((chip: any) => {
//                   const chipText = typeof chip === 'string' ? chip : chip.text
//                   return chipText !== chipToRemove
//                 })
//                 formProps.onChange(filteredChips)
//               }}
//               allowCustomValues={true}
//               allowInvalidChips={true}
//               chipValidationSchema={hdmChipValidationSchema}
//               chipValidationErrorMessage="Invalid HDM serial number format"
//             />
//           )}
//         />
//       </FormContainer>
//     </div>
//   )
// }
// Story demonstrating proper form integration with FormContainer and FormField
// export const WithFormIntegration = (): JSX.Element => {
//   const initialValues = {
//     skills: ['React', 'TypeScript', 'JavaScript']
//   }

//   const validationSchema = yup.object({
//     skills: yup.array().of(yup.string().min(2, 'Skill must be at least 2 characters')).min(1, 'At least one skill is required')
//   })

//   const handleSubmit = (values: any) => {

//     console.log('Form submitted with values:', values.skills)
//   }

//   return (
//     <div className="max-w-md p-6" style={{ maxWidth: 500, padding: 20 }}>
//       <FormContainer
//         initialValues={initialValues}
//         validationScheme={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         <FormField
//           name="skills"
//           As={(formProps: any) => (
//             <div>
//               <MultiTextareaWithChips
//                 label="Skills"
//                 placeholder="Add a skill and press Enter"
//                 helperText="Type and press Enter to add skills, or select from available options"
//                 chips={Array.isArray(formProps.value) ? (formProps.value as string[]) : []}
//                 onAddChip={(chip: string) => {
//                   const currentSkills = Array.isArray(formProps.value) ? (formProps.value as string[]) : []
//                   formProps.onChange([...currentSkills, chip])
//                 }}
//                 onRemoveChip={(chipToRemove: string) => {
//                   const currentSkills = Array.isArray(formProps.value) ? (formProps.value as string[]) : []
//                   formProps.onChange(currentSkills.filter(skill => skill !== chipToRemove))
//                 }}
//                 availableOptions={[
//                   'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java', 'C++',
//                   'Vue.js', 'Angular', 'Svelte', 'Next.js', 'GraphQL', 'MongoDB', 'PostgreSQL'
//                 ]}
//                 chipValidationSchema={hdmValidationSchema}
//                 allowCustomValues={true}
//               />
//             </div>
//           )}
//         />
//       </FormContainer>
//     </div>
//   )
// }

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
  const { errors, setValue, reset, watch } = useFormProps()

  const watchedSkills = watch?.('skills')

  const handleSubmit = (values: any) => {
    console.log('values', values)
  }

  // Create a validation schema that requires at least one valid chip
  const validationSchema = yup.object({
    skills: yup
      .array()
      .of(
        yup.object({
          text: yup.string().test('hdm-format', 'Invalid HDM serial number format', (value) => {
            if (!value) return false
            const serialNumber = value.trim()
            // Valid HDM serial number formats
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
      // .min(1, 'At least one HDM serial number is required')
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

  return (
    <div className="mt-3" style={{ color: 'red' }}>
      {/*{errors?.skills ? 'Please fix the highlighted errors.' : 'No values provided.'}*/}
    </div>
  )
}
