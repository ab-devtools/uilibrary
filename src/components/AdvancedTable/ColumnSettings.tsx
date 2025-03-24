import React, { useState } from 'react'
import type { Table } from '@tanstack/react-table'
import { Button } from '../Button'
import { IconSettings } from '../SVGIcons'
import { Switcher } from '../Switcher'
import { Menu } from '../Menu'

interface ColumnSettingsProps<T> {
  table: Table<T>
}

export function ColumnSettings<T>({ table }: ColumnSettingsProps<T>) {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeUserMenu = () => {
    setIsOpen(false);
  };

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
          {table.getAllLeafColumns().map((column) => (
            <div key={column.id} className={'settings-menu__dropdown__option'}>
              <Switcher
                label={
                  typeof column.columnDef.header === 'string'
                    ? column.columnDef.header
                    : column.id
                }
                selectedValue={column.getIsVisible()}
                onClick={() => {
                  const toggle = column.getToggleVisibilityHandler()
                  if (toggle) {
                    toggle({ target: { checked: !column.getIsVisible() } })
                  }
                }}
                disabled={!column.getCanHide()}
                inlineType={true}
                size={'small'}
              />
            </div>
          ))}
        </div>
      </Menu>
    </div>
  )
}
