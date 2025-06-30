import type { ReactElement } from 'react'
import React from 'react'
import type { TBreadCrumbItem, TBreadCrumbProps } from './types'

export const Breadcrumb = (props: TBreadCrumbProps): ReactElement | null => {
  const { selectedValue, breadCrumbItems, className = '', onSelect } = props

  return (
    <div className={`breadcrumb ${className}`}>
      {breadCrumbItems.map((itemInfo: TBreadCrumbItem) => {
        return (
          <span className="breadcrumb__item" key={itemInfo.value}>
            <span
              className={`breadcrumb__item__inner ${
                selectedValue === itemInfo.value ? 'selected' : ''
              }`}
              onClick={() => {
                onSelect(itemInfo.value)
                itemInfo.onClick()
              }}
            >
              {itemInfo.label}
            </span>
          </span>
        )
      })}
    </div>
  )
}
