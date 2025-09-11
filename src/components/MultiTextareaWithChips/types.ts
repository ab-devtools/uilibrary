import type { AnySchema } from 'yup'

export interface TMultiTextareaWithChipsProps extends IFormCompProps {
  label: string
  placeholder: string
  helperText?: string
  chips?: Array<string | TChipItem>
  onAddChip?: (chip: string) => void
  onRemoveChip?: (chip: string) => void
  onAddChipItem?: (chip: TChipItem) => void
  onRemoveChipItem?: (chip: TChipItem) => void
  className?: string
  disabled?: boolean
  availableOptions?: string[]
  allowCustomValues?: boolean
  searchPlaceholder?: string
  chipValidationSchema?: AnySchema
  chipValidationErrorMessage?: string
  allowInvalidChips?: boolean
  error?: string
  required?: boolean
  minChips?: number
  maxChips?: number
  minChipLength?: number
  maxChipLength?: number
  validateChip?: (chip: string) => void
  searchPlaceholderText?: string
  typeAndEnterPlaceholderText?: string
  noOptionsPlaceholderText?: string
  autoFormIntegration?: boolean
  fieldName?: string
  formProps?: {
    setFieldValue?: (
      fieldName: string,
      value: TFormValue,
      shouldValidate?: { shouldValidate: boolean }
    ) => void
    [key: string]:
    | TFormValue
    | ((
      fieldName: string,
      value: TFormValue,
      shouldValidate?: { shouldValidate: boolean }
    ) => void)
    | undefined
  }
  onFormSubmit?: () => void
}

export type TChipItem = {
  text: string
  hasError?: boolean
  errorMessage?: string
  id?: string | number
}
