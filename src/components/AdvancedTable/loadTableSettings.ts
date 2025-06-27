import type { ColumnSettings } from './types'

export const loadTableSettings = (tableKey: string): ColumnSettings => {
  try {
    const raw = localStorage.getItem(tableKey)
    return raw ? JSON.parse(raw) : { columnOrder: [], columnSizing: {}, columnVisibility: {} }
  } catch {
    return { columnOrder: [], columnSizing: {}, columnVisibility: {} }
  }
}
