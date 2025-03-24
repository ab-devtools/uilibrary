/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ForwardedRef } from 'react'
import React, { forwardRef, useEffect, useRef } from 'react'
import { Checkbox } from '../Checkbox'
import classNames from 'classnames'

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
      <Checkbox
        className={classNames('checkbox', { 'active-checkbox': checked })}
        value={checked}
        disabled={disabled}
        onClick={handleChange}
        ref={resolvedRef}
      />
    )
  }
)

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox'
