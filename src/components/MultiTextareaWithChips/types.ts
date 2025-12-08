import type { AnySchema } from 'yup'

export interface TChipItem {
  text: string
  hasError?: boolean
  errorMessage?: string
  id?: string | number
  [key: string]: unknown
}

export type ChipValue = string | TChipItem

export type OnBlurBehavior =
  | 'add-chip'
  | 'add-if-valid'
  | 'add-if-available'
  | 'add-if-min-length'
  | 'ignore'

export interface OnBlurConfig {
  behavior: OnBlurBehavior
  minLength?: number
}

export interface TMultiTextareaWithChipsProps extends IFormCompProps {
  label: string
  placeholder: string
  helperText?: string
  chips?: ChipValue[]
  onAddChip?: (chip: string) => void
  onRemoveChip?: (chip: string) => void
  className?: string
  disabled?: boolean
  availableOptions?: string[]
  allowCustomValues?: boolean
  searchPlaceholder?: string
  chipValidationSchema?: AnySchema
  chipValidationErrorMessage?: string
  allowInvalidChips?: boolean
  minChipLength?: number
  maxChipLength?: number
  searchPlaceholderText?: string
  transformToUppercase?:boolean
  typeAndEnterPlaceholderText?: string
  noOptionsPlaceholderText?: string
  fieldName?: string
  onBlurConfig?: OnBlurConfig
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
}
