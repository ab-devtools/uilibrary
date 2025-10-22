import type { Column, Table } from '@tanstack/react-table'
import React, { useState } from 'react'
import { Button } from '../Button'
import { IconSettings } from '../SVGIcons'
import { Switcher } from '../Switcher'
import { Menu } from '../Menu'
import { Tooltip } from '../Tooltip'
import { Positions } from '../Tooltip/types'

interface ColumnSettingsProps<T> {
  table: Table<T>
  tooltipText?: string
  hiddenColumns?: string[]
  allToggleText?: string
  menuIconTooltipText?: string
}

const defaultHiddenColumnSettings = ['select', 'actions', 'expand']

export function ColumnSettings<T>({
  table,
  tooltipText,
  menuIconTooltipText,
  hiddenColumns = [],
  allToggleText = 'All'
}: ColumnSettingsProps<T>) {
  const [menuButtonRef, setMenuButtonRef] = useState<HTMLButtonElement | null>(null)
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

  const hiddenColumnSettings = defaultHiddenColumnSettings.concat(hiddenColumns)

  return (
    <div ref={setRef}>
      {menuIconTooltipText && (
        <Tooltip
          position={Positions.TOP_CENTER}
          text={menuIconTooltipText}
          id="column-settings-menu-icon"
        />
      )}
      <Button
        refHandler={setMenuButtonRef}
        type="secondary"
        id="column-settings-menu-icon"
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
        additionalRef={menuButtonRef}
      >
        <div className="settings-menu__dropdown">
          <div className="relative">
            <div className="settings-menu__dropdown__option sticky">
              <Switcher
                label={allToggleText}
                selectedValue={table.getIsAllColumnsVisible()}
                onClick={() => table.toggleAllColumnsVisible()}
                inlineType={true}
                size={'small'}
              />
            </div>
          </div>
          <div className="scrollbar--content scrollbar scrollbar--vertical">
            {table.getAllLeafColumns().map((column) => {
              if (!hiddenColumnSettings?.includes(column.id)) {
                const label =
                  typeof column.columnDef.header === 'string'
                    ? column.columnDef.header
                    : column.columnDef.id
                return (
                  <div key={column.id} className={'settings-menu__dropdown__option'}>
                    {tooltipText && !column.getCanHide() && (
                      <Tooltip
                        position={Positions.TOP_CENTER}
                        text={tooltipText}
                        id={column.columnDef.id}
                      />
                    )}
                    <Switcher
                      label={label}
                      id={column.columnDef.id}
                      selectedValue={column.getIsVisible()}
                      onClick={() => handleClick(column)}
                      disabled={!column.getCanHide()}
                      inlineType={true}
                      size={'small'}
                    />
                  </div>
                )
              }
            })}
          </div>
        </div>
      </Menu>
    </div>
  )
}
