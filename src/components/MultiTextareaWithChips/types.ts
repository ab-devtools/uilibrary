import type { AnySchema } from 'yup'

export interface TMultiTextareaWithChipsProps extends IFormCompProps {
  allowCustomValues?: boolean
  allowInvalidChips?: boolean
  autoFormIntegration?: boolean
  availableOptions?: string[]
  chipValidationErrorMessage?: string
  chipValidationSchema?: AnySchema
  chips?: Array<string | TChipItem>
  className?: string
  disabled?: boolean
  error?: string
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
  helperText?: string
  label: string
  maxChipLength?: number
  maxChips?: number
  minChipLength?: number
  minChips?: number
  noOptionsPlaceholderText?: string
  onAddChip?: (chip: string) => void
  onAddChipItem?: (chip: TChipItem) => void
  onRemoveChip?: (chip: string) => void
  onRemoveChipItem?: (chip: TChipItem) => void
  placeholder: string
  required?: boolean
  searchPlaceholder?: string
  searchPlaceholderText?: string
  typeAndEnterPlaceholderText?: string
  validateChip?: (chip: string) => void
}

export type TChipItem = {
  text: string
  hasError?: boolean
  errorMessage?: string
  id?: string | number
}
