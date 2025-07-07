import type { ReactElement } from 'react'
import React from 'react'
import { Chips } from '../../Chips'
import type { TChipsProps } from '../../Chips/types'

interface TCardChips {
  chips: TChipsProps[]
}
export const CardChips = (props: TCardChips): ReactElement => {
  const { chips } = props
  return (
    <div className={'card-select__chips mt-16'}>
      {chips.map((chip) => (
        <Chips
          {...chip}
          key={chip.id}
          onClick={chip.onClick}
          withAction={chip.withAction}
        />
      ))}
    </div>
  )
}
