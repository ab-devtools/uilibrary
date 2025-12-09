import type {
  ColumnDef,
  ColumnSizingState,
  PaginationState,
  RowSelectionState,
  Table,
  Row
} from '@tanstack/react-table'
import type { HTMLAttributes, ReactNode } from 'react'

export type TTable<TData> = Table<TData>
export type TRowSelectionState = RowSelectionState
export type TColumnSizingState = ColumnSizingState
export type TPaginationState = PaginationState
export type TPersistColumnSettings = 'localStorage' | 'external'

export type TTableProps<TData> = {
  data: (TData & { subRows?: TData[] })[]
  isLoading?: boolean
  columns: ColumnDef<TData>[]
  wi?: boolean
  activeRowId?: string
  isActionsVisible?: boolean
  totalCount?: number
  hasError?: boolean
  emptyTitle?: string
  emptySubTitle?: string
  emptyIllustration?: string
  className?: string
  withSelect?: boolean
  withBorder?: boolean
  customHeader?: ReactNode
  defaultPageIndex?: number
  defaultPageSize?: number
  defaultHiddenColumns?: string[]
  collapsibleRows?: boolean
  tableSettings?: {
    tableName?: string
    persistColumnSettings?: TPersistColumnSettings
    onColumnSettingsChange?: (settings: ColumnSettings) => void
  }
  renderExpandedContent?: (row: Row<TData>) => ReactNode
  renderHeader?: (table: TTable<TData>) => ReactNode
  renderFooter?: (table: Table<TData>) => ReactNode
  onRowClick?: (row: Row<TData>) => void
  onSortChange?: (state: SortingUpdateEvent) => void
  rowEventsProps?: HTMLAttributes<HTMLTableRowElement>
  onRowSelection?: (state: TRowSelectionState) => void
  onColumnSizing?: (state: TColumnSizingState) => void
  onPaginationChange?: (state: TPaginationState) => void
  getRowId?: (row: TData) => string
  resetExpandedOnPageChange?: boolean
  rowClassName?: (row: Row<TData>) => string | undefined
}

export type Column<TData> = ColumnDef<TData> & {
  enableColumnDragging?: boolean
}

export type SortingUpdateEvent = {
  column: string
  direction: 'asc' | 'desc' | false
  timestamp: number
}

export interface ICellProps<TData> {
  row: Row<TData>
}

export interface IHeaderProps<TData> {
  table: Table<TData>
}

export interface TableData {
  subRows: TableData[]
  [key: string]: unknown
}

export interface ExpandColumnProps<TData> {
  row: Row<TData>
  expandedRows: Set<string>
  onToggle: (rowId: string) => void
}

export interface ColumnSettings {
  columnVisibility: Record<string, boolean>
  columnOrder: string[]
  columnSizing: Record<string, number>
}
