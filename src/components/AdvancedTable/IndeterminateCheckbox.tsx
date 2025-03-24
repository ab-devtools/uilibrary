/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ForwardedRef } from 'react'
import React, { forwardRef, useEffect, useRef } from 'react'
import { Checkbox } from '../Checkbox'
import classNames from 'classnames'
import {Button} from "../Button";
import IconDelete from "../SVGIcons/IconDelete";
import IconSend from "../SVGIcons/IconSend";
import IconEdit from "../SVGIcons/IconEdit";

type IndeterminateCheckboxProps = {
  indeterminate: boolean
  checked: boolean
  onChange: (e: { target: { checked: boolean } }) => void
  disabled?: boolean
}

export const IndeterminateCheckbox = forwardRef(
  (
    { indeterminate, checked, onChange, disabled }: IndeterminateCheckboxProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const defaultRef = useRef(null)
    const resolvedRef: any = ref ?? defaultRef

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    const handleChange = (v: boolean) => {
      onChange({ target: { checked: v } })
    }

    return (
        <div className={'actions-list'}>
          <Checkbox
              className={classNames('actions-list__checkbox', { 'active-checkbox': checked })}
              value={checked}
              disabled={disabled}
              onClick={handleChange}
              ref={resolvedRef}
          />
          <div className={'actions-list__right'}>
            <Button iconProps={{Component: IconDelete}} type={'secondary'} size={'medium'}/>
            <Button iconProps={{Component: IconSend}} type={'secondary'} size={'medium'}/>
            <Button iconProps={{Component: IconEdit}} type={'secondary'} size={'medium'}/>
          </div>
        </div>
    )
  }
)

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox'
