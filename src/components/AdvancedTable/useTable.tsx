import type {
  ColumnDef,
  RowSelectionState,
  SortingState,
  OnChangeFn,
  ColumnSizingState,
  PaginationState,
  VisibilityState
} from '@tanstack/react-table'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import React, { useState, useMemo } from 'react'
import { IndeterminateCheckbox } from './IndeterminateCheckbox'
import { arrayMove } from '@dnd-kit/sortable'
import type { Column, ICellProps, IHeaderProps, SortingUpdateEvent, TTableProps } from './types'

export function useTable<TData>({
  withSelect,
  columns,
  data,
  totalCount = 0,
  defaultPageSize = 10,
  defaultPageIndex = 0,
  defaultHiddenColumns = [],
  onSortChange,
  onRowSelection,
  onColumnSizing,
  onPaginationChange
}: TTableProps<TData>) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: defaultPageIndex,
    pageSize: defaultPageSize
  })

  const memoizedColumns = useMemo(() => {
    const columnsList: Column<TData>[] = [...columns].map((col: Column<TData>) => {
      if (col.id === 'actions') {
        return {
          ...col,
          enableColumnDragging: false,
          enableSorting: false,
          enableResizing: false,
          enableHiding: false
        }
      }
      return col
    })

    if (withSelect) {
      columnsList.unshift({
        id: 'select',
        enableHiding: false,
        enableColumnDragging: false,
        enablePinning: true,
        header: ({ table }: IHeaderProps<TData>) => (
          <IndeterminateCheckbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }: ICellProps<TData>) => (
          <IndeterminateCheckbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        )
      })
    }
    return columnsList
  }, [columns])

  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    memoizedColumns.map((column) => column.id as string)
  )

  const reorderedColumns = columnOrder.map((columnId) =>
    memoizedColumns.find((col) => col.id === columnId)
  ) as ColumnDef<TData>[]

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    const newSorting =
      typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue

    setSorting(newSorting)

    const sortingEvent: SortingUpdateEvent = {
      column: newSorting[0]?.id ?? '',
      direction: newSorting[0]?.desc ? 'desc' : newSorting[0]?.id ? 'asc' : false,
      timestamp: Date.now()
    }
    onSortChange?.(sortingEvent)
  }

  const handleRowSelect: OnChangeFn<RowSelectionState> = (updaterOrValue) => {
    const newSelectionRow =
      typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection) : updaterOrValue

    setRowSelection(newSelectionRow)
    onRowSelection?.(newSelectionRow)
  }

  const handleColumnSizingChange: OnChangeFn<ColumnSizingState> = (updaterOrValue) => {
    const newColumnSizing =
      typeof updaterOrValue === 'function' ? updaterOrValue(columnSizing) : updaterOrValue

    setColumnSizing(newColumnSizing)
    onColumnSizing?.(newColumnSizing)
  }

  const handlePaginationChange: OnChangeFn<PaginationState> = (updaterOrValue) => {
    const newPagination =
      typeof updaterOrValue === 'function' ? updaterOrValue(pagination) : updaterOrValue

    setPagination(newPagination)
    onPaginationChange?.(newPagination)
  }

  const hiddenColumns = defaultHiddenColumns?.reduce((acc: VisibilityState, key: string) => {
    acc[key] = false
    return acc
  }, {})

  const table = useReactTable({
    data,
    columns: reorderedColumns,
    pageCount: Math.ceil(totalCount / pagination.pageSize),
    state: {
      sorting,
      pagination,
      columnOrder,
      columnSizing,
      rowSelection,
      columnVisibility: {
        ...hiddenColumns,
        ...columnVisibility
      },
      columnPinning: {
        left: ['select'],
        right: ['actions']
      }
    },
    defaultColumn: {
      minSize: 200,
      size: 150,
      maxSize: 400
    },
    onPaginationChange: handlePaginationChange,
    onColumnSizingChange: handleColumnSizingChange,
    onSortingChange: handleSortingChange,
    onRowSelectionChange: handleRowSelect,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: 'onChange',
    manualSorting: !!onSortChange,
    manualPagination: !!onPaginationChange,
    enableRowSelection: true,
    enableColumnResizing: true
  })

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5
      }
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
    document.body.classList.add('select-none')
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = columnOrder.indexOf(active.id as string)
      const newIndex = columnOrder.indexOf(over.id as string)
      const oldColumn = reorderedColumns[newIndex] as Column<TData>
      if (oldColumn?.enableColumnDragging === false) {
        return
      }
      const newColumnOrder = arrayMove(columnOrder, oldIndex, newIndex)
      setColumnOrder(newColumnOrder)
    }

    setActiveId(null)
    document.body.classList.remove('select-none')
  }

  const handleDragCancel = () => {
    setActiveId(null)
    document.body.classList.remove('select-none')
  }

  const activeHeader = activeId
    ? table.getHeaderGroups()[0].headers.find((header) => header.id === activeId)
    : null

  return {
    table,
    activeHeader,
    sensors,
    memoizedColumns,
    handleDragCancel,
    handleDragEnd,
    handleDragStart
  }
}
