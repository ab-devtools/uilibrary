import type { ForwardedRef, ReactElement } from 'react'
import React, { forwardRef, useState } from 'react'
import { CollapseItem } from '../CollapseItem/CollapseItem'

import type { TCollapseGroupProps, TCollapseGroupItem, TCollapseValue } from '../types'
import classNames from 'classnames'

export const CollapseGroup = forwardRef(
  (props: TCollapseGroupProps, ref: ForwardedRef<HTMLDivElement>): ReactElement => {
    const { items, singleSelection, className } = props
    const [openValues, setOpenValues] = useState<TCollapseValue[]>(
      items.filter((item: TCollapseGroupItem) => item.isOpen).map((item) => item.value)
    )

    const onCollapseSelect = (value: TCollapseValue) => {
      if (singleSelection) {
        setOpenValues([value])
      } else {
        setOpenValues([...openValues, value])
      }
    }
    const onCollapseDeselect = (value: TCollapseValue) => {
      setOpenValues(openValues.filter((item) => item !== value))
    }

    return (
      <div className={classNames('collapse-group', className)} ref={ref}>
        {items.map(
          ({
            id,
            title,
            subtext,
            additionalInfo,
            value,
            content,
            iconProps,
            disabled,
            isHidden,
            reverse
          }) => {
            const isOpen = openValues.indexOf(value) !== -1
            return !isHidden && (
              <CollapseItem
                className={'collapse-group__item'}
                id={id}
                isOpen={isOpen}
                disabled={disabled}
                key={value}
                title={title}
                subtext={subtext}
                additionalInfo={additionalInfo}
                toggle={() => (isOpen ? onCollapseDeselect(value) : onCollapseSelect(value))}
                iconProps={iconProps}
                reverse={reverse}
              >
                {content}
              </CollapseItem>
            )
          }
        )}
      </div>
    )
  }
)

CollapseGroup.displayName = 'CollapseGroup'
