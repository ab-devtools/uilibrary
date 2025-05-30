declare type TIconSize = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'

declare type TColor =
  | 'borderGray'
  | 'labelGray'
  | 'justWhite'
  | 'textBlack'
  | 'dropdownGray'
  | 'inputWhite'
  | 'inputBorderGray'
  | 'inputBorderActive'
  | 'inputBorderError'
  | 'buttonGreen'
  | 'secButtonBorderGray'
  | 'iconGray'
  | 'footerTextGray'
  | 'footerUnderlineGray'
  | 'darkGray'

declare type CallbackFnType = () => void

declare type TIconSizes = {
  [size in TIconSize]: string
}

interface TCustomIcons {
  [iconName: string]: () => string
}

declare type TCustomColors = {
  [color: string]: string
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

declare type TFormData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

interface StringEventTarget extends EventTarget {
  text: string
}
interface InputEvent extends EventTarget {
  target: {
    value: string
    className?: string
  }
}
interface MouseEvent extends EventTarget {
  target: TextEventTarget | StringEventTarget
}

type FieldError = {
  message: string
}

declare type FieldErrors = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

interface RefObject<T> {
  readonly current: T | null
}

declare type TSetValue = (name: string, value: unknown, config?: { [key: string]: unknown }) => void

interface FileEventTarget extends EventTarget {
  files: FileList
}

declare type TTextAreaEventType = ChangeEventHandler<HTMLTextAreaElement>

declare type TCreateErrorFieldParams = {
  errorMessage: string | undefined
  name: string
  errors: FieldErrors | undefined
}

declare type TImageMimeTypes =
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/png'
  | 'image/heic'
  | 'image/heif'
  | 'application/pdf'

declare type TItemValue = string | number | null
declare type TSelectedValue = {
  value: TItemValue
  label: TItemLabel
  optionLeftIcon?: TSelectIconProps
  parentId?: TItemValue
}
declare type TItemLabel = string | number

declare type TClickHandler = (e: TClickEventType) => void

declare type TSVGIconComponent = (props: ISVGIconProps) => ReactElement

declare type TSelectIconProps = {
  type?: TIconTypes
  size?: TIconSize
  className?: string
  onClick?: TClickHandler
  Component?: TSVGIconComponent
}
declare type TSelectOption = {
  value: TItemValue
  label: TItemLabel
  meta?: string
  disabled?: boolean
  children?: TSelectOption[]
  dataId?: string
  parentId?: string | number | null
  optionLeftIcon?: TSelectIconProps
}

declare type TSelectOptions = TSelectOption[]

declare type TSelectGroupOption = {
  title: string
  dataId?: string
  data: TSelectOptions
}

declare type TSelectTreeOption = {
  title: string
  dataId?: string
  parentId?: string | number | null
  data: TSelectOptions
}

declare type TSelectGroupOptions = TSelectGroupOption[]
declare type TSelectTreeOptions = TSelectTreeOption[]

declare type TRangePickerValues = [Date | null, Date | null]

declare type TClickEventType = React.MouseEvent<HTMLElement>
declare type TChangeEventType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>

declare type TFormValue =
  | string
  | number
  | boolean
  | TSelectOption
  | TItemValue
  | File[]
  | FileReader[]
  | Date
  | TRangePickerValues
  | null
  | TItemValue[]
  | TSelectedValue[]
declare type TOnChange = (event: TChangeEventType) => void

// Props which will pass FormField to component
declare interface IFormCompProps {
  hasError?: boolean
  isValid?: boolean
  value?: TFormValue
  onChange?: TOnChange
  dataId?: string
  name?: string
  setFieldValue?: (
    name: string,
    value: TFormValue,
    shouldValidate?: { shouldValidate: boolean }
  ) => void
}

declare type TRegister = (name: string) => {
  onChange: TOnChange
}

declare type TTooltipPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'middle-left'
  | 'middle-right'

declare type TTooltipInfo = {
  hasTriangle?: boolean
  initialPosition: TTooltipPosition
  elemRef: HTMLElement | null
  tooltipRef: HTMLElement | null
}

declare type TCallBackFn = () => void

declare type TDirtyFields = Partial<Readonly<{ [x: string]: unknown }>>

declare module '*.svg'
