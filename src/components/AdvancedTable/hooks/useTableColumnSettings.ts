import type { Table } from '@tanstack/react-table'
import { useEffect, useRef } from 'react'

export const useTableColumnSettings = <T>(
  table: Table<T>,
  tableName: string,
  shouldPersistToStorage: boolean
) => {
  const prevSettings = useRef<string | null>(null)

  const state = table.getState()

  useEffect(() => {
    const settings = {
      columnVisibility: state.columnVisibility,
      columnOrder: state.columnOrder,
      columnSizing: state.columnSizing
    }

    const serialized = JSON.stringify(settings)

    if (prevSettings.current !== serialized && shouldPersistToStorage) {
      localStorage.setItem(tableName, serialized)
      prevSettings.current = serialized
    }
  }, [state.columnVisibility, state.columnOrder, state.columnSizing, tableName])
}
