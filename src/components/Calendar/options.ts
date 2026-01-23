import type { TMonthOption, TMonthOptionLabel } from './types'

export const monthOptions: TMonthOption[] = [
  { value: 0, label: { 'en-US': 'Jan', ru: 'Янв', hy: 'Հնվ' } },
  { value: 1, label: { 'en-US': 'Feb', ru: 'Фев', hy: 'Փտվ' } },
  { value: 2, label: { 'en-US': 'Mar', ru: 'Мар', hy: 'Մրտ' } },
  { value: 3, label: { 'en-US': 'Apr', ru: 'Апр', hy: 'Ապր' } },
  { value: 4, label: { 'en-US': 'May', ru: 'Май', hy: 'Մայ' } },
  { value: 5, label: { 'en-US': 'Jun', ru: 'Июн', hy: 'Հնս' } },
  { value: 6, label: { 'en-US': 'Jul', ru: 'Июл', hy: 'Հլս' } },
  { value: 7, label: { 'en-US': 'Aug', ru: 'Авг', hy: 'Օգս' } },
  { value: 8, label: { 'en-US': 'Sep', ru: 'Сен', hy: 'Սպտ' } },
  { value: 9, label: { 'en-US': 'Oct', ru: 'Окт', hy: 'Հոկ' } },
  { value: 10, label: { 'en-US': 'Nov', ru: 'Ноя', hy: 'Նոյ' } },
  { value: 11, label: { 'en-US': 'Dec', ru: 'Дек', hy: 'Դեկ' } }
]

export const getMonthOptions = (locale: string) => {
  const lang = locale as keyof TMonthOptionLabel
  return monthOptions.map((option) => ({ ...option, label: option.label[lang] }))
}
