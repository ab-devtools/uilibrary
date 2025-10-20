export const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf']

export const IMAGE_MIME_TYPES_FOR_PREVIEW: TImageMimeTypes[] = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/heic',
  'image/heif',
  'application/pdf'
]

export const IMAGE_MIME_TYPE: string[] = ['.jpeg', '.jpg', '.png', '.heic', '.heif', '.pdf']

//TODO as a result of discussion with the designers, it was decided to add temporary constants , in the next stage we should correct that
export const SCREEN_SIZES = {
  SMALL: 768,
  MEDIUM: 992,
  LARGE: 1200
}

export enum FILE_UPLOAD_ERRORS {
  'size',
  'type'
}

export enum CARD_SELECT_TYPES {
  cardRadio = 'cardRadio',
  card = 'card'
}

export const CUSTOM_SCROLL_MESSAGE = 'Custom scroll event has fired'
export const CUSTOM_SCROLL_NAME = 'CUSTOM_SCROLL_EVENT'

export const MONTHS = [
  {
    label: 'January',
    value: 0
  },
  {
    label: 'February',
    value: 1
  },
  {
    label: 'March',
    value: 2
  },
  {
    label: 'April',
    value: 3
  },
  {
    label: 'May',
    value: 4
  },
  {
    label: 'June',
    value: 5
  },
  {
    label: 'July',
    value: 6
  },
  {
    label: 'August',
    value: 7
  },
  {
    label: 'September',
    value: 8
  },
  {
    label: 'October',
    value: 9
  },
  {
    label: 'November',
    value: 10
  },
  {
    label: 'December',
    value: 11
  }
]

export const DROPDOWN_AND_INPUT_GAP = 10
