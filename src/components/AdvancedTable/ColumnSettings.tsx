import type { Column, Table } from '@tanstack/react-table'
import React, { useState } from 'react'
import { Button } from '../Button'
import { IconSettings } from '../SVGIcons'
import { Switcher } from '../Switcher'
import { Menu } from '../Menu'

interface ColumnSettingsProps<T> {
  table: Table<T>
  hiddenColumnSettings?: string[]
}

export function ColumnSettings<T>({ table, hiddenColumnSettings }: ColumnSettingsProps<T>) {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const closeUserMenu = () => {
    setIsOpen(false)
  }

  const handleClick = (column: Column<T>) => {
    const toggle = column.getToggleVisibilityHandler()
    if (toggle) {
      toggle({ target: { checked: !column.getIsVisible() } })
    }
  }

  return (
    <div ref={setRef}>
      <Button
        type={'secondary'}
        iconProps={{
          Component: IconSettings
        }}
        onClick={() => setIsOpen((prev: boolean) => !prev)}
      />
      <Menu
        className="settings-menu"
        position="top-left"
        onClose={closeUserMenu}
        isOpen={isOpen}
        parentRef={ref}
      >
        <div className="settings-menu__dropdown scrollbar scrollbar--vertical">
          {table.getAllLeafColumns().map((column) => {
            if (!hiddenColumnSettings?.includes(column.id)) {
              return (
                <div key={column.id} className={'settings-menu__dropdown__option'}>
                  <Switcher
                    label={`${column.columnDef.header}`}
                    selectedValue={column.getIsVisible()}
                    onClick={() => handleClick(column)}
                    disabled={!column.getCanHide()}
                    inlineType={true}
                    size={'small'}
                  />
                </div>
              )}
          })}
        </div>
      </Menu>
    </div>
  )
}
