import type { ReactElement } from 'react'
import React from 'react'

import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import { ButtonSelect } from '../../Select'

import { getYearOptions, noop } from '../../../utils/helpers'
import './styles.scss'
import IconChevronLeft from '../../SVGIcons/IconChevronLeft'
import IconChevronRight from '../../SVGIcons/IconChevronRight'
import type { TSelectOptions } from '../../../types/globalTypes'

interface TProps extends ReactDatePickerCustomHeaderProps {
  months: TSelectOptions
  startYear: number
  endYear: number
  dataPrefix?: string
}

export const CustomHeader = (props: TProps): ReactElement => {
  const {
    months,
    date,
    dataPrefix,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    startYear,
    endYear,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled
  } = props

  const getMonthLabel = (month: number) => {
    const selectMonth = months.find((item) => item.value === month)
    return selectMonth?.label.toString()
  }

  const month = date?.getMonth()
  const year = date?.getFullYear()

  return (
    <div className="flexbox custom_header_container">
      <IconChevronLeft
        size="small"
        className="cursor-pointer"
        dataId={dataPrefix ? `${dataPrefix}-prev-month-button` : ''}
        onClick={prevMonthButtonDisabled ? noop : decreaseMonth}
        type={prevMonthButtonDisabled ? 'disabled' : 'primary'}
      />
      <div className="selects_container">
        <ButtonSelect
          size="small"
          type="tertiary"
          className="date_picker_select"
          offsets={{ top: 42, left: 48 }}
          placeHolder={getMonthLabel(month)}
          dataId={dataPrefix ? `${dataPrefix}-month-select` : ''}
          options={months}
          selectedItem={month}
          setSelectedItem={(m) => changeMonth(m as number)}
          dropdownWidth={150}
          isRequiredField
        />
        <ButtonSelect
          type="tertiary"
          className="date_picker_select"
          offsets={{ top: 42, left: 138 }}
          placeHolder={year.toString()}
          dataId={dataPrefix ? `${dataPrefix}-year-select` : ''}
          size="small"
          options={getYearOptions(startYear, endYear)}
          selectedItem={year}
          setSelectedItem={(y) => changeYear(y as number)}
          dropdownWidth={100}
          isRequiredField
        />
      </div>
      <IconChevronRight
        size="small"
        className="cursor-pointer"
        dataId={dataPrefix ? `${dataPrefix}-next-month-button` : ''}
        onClick={nextMonthButtonDisabled ? noop : increaseMonth}
        type={nextMonthButtonDisabled ? 'disabled' : 'primary'}
      />
    </div>
  )
}
