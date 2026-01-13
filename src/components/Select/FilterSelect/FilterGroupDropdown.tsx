import type { JSX } from 'react'
import React from 'react'
import type { TFilterGroupDropdownContentProps } from '../types'
import { FilterDropdownContent } from './FilterDropdown'
import type { TSelectGroupOption } from '../../../types/globalTypes'

export const FilterGroupDropdownContent = (
  props: TFilterGroupDropdownContentProps
): JSX.Element => {
  const { options, ...rest } = props

  return (
    <>
      {options.map(({ data, title }: TSelectGroupOption) => {
        return (
          <div className="group_container" key={title}>
            <span>{title}</span>
            <FilterDropdownContent options={data} {...rest} />
          </div>
        )
      })}
    </>
  )
}
