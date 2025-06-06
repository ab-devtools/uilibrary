import type { CSSProperties } from 'react'
import type { Column, Row, ColumnDef } from '@tanstack/react-table'
import type { TTableProps } from './types'
import React, { useState, useCallback, useMemo } from 'react'
import { flexRender } from '@tanstack/react-table'
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { ColumnHeader } from './ColumnHeader'
import Skeleton from 'react-loading-skeleton'
import { useTable } from './useTable'
import { Text } from '../Text'
import classnames from 'classnames'
import { Empty } from '../Empty'
import { Button } from '../Button'
import { IconChevronDown } from '../SVGIcons/IconChevronDown'
import { IconChevronUp } from '../SVGIcons/IconChevronUp'
import 'react-loading-skeleton/dist/skeleton.css'

enum ColumnId {
  Select = 'select',
  Actions = 'actions',
  Expand = 'expand'
}

interface TableData {
  subRows?: TableData[]
  [key: string]: any
}

interface ExpandColumnProps<TData extends TableData> {
  row: Row<TData>
  expandedRows: Set<string>
  onToggle: (rowId: string) => void
}

const ExpandColumn = <TData extends TableData>({
  row,
  expandedRows,
  onToggle
}: ExpandColumnProps<TData>) => {
  const hasSubRows = row.original.subRows && row.original.subRows.length > 0
  if (!hasSubRows) return null

  return (
    <Button
      type="tertiary"
      size="medium"
      className="advanced-table__expand-button"
      iconProps={{
        Component: expandedRows.has(row.id) ? IconChevronUp : IconChevronDown
      }}
      onClick={(e) => {
        e.stopPropagation()
        onToggle(row.id)
      }}
    />
  )
}

export function Table<TData extends TableData>({
  data,
  columns,
  isLoading,
  hasError,
  isActionsVisible = false,
  totalCount = 0,
  emptyTitle,
  emptySubTitle,
  emptyIllustration,
  withSelect = false,
  withBorder = true,
  defaultPageIndex,
  defaultPageSize,
  defaultHiddenColumns,
  collapsibleRows = false,
  renderExpandedContent,
  renderHeader,
  renderFooter,
  onSortChange,
  onRowClick,
  onRowSelection,
  onColumnSizing,
  onPaginationChange
}: TTableProps<TData>) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const handleToggleRow = useCallback((rowId: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev)
      if (next.has(rowId)) {
        next.delete(rowId)
      } else {
        next.add(rowId)
      }
      return next
    })
  }, [])

  const expandColumn: ColumnDef<TData> = useMemo(
    () => ({
      id: ColumnId.Expand,
      accessorKey: 'expand',
      header: () => <span style={{ display: 'none' }}>Expand</span>,
      size: 50,
      minSize: 50,
      maxSize: 50,
      cell: ({ row }) => (
        <ExpandColumn row={row} expandedRows={expandedRows} onToggle={handleToggleRow} />
      ),
      meta: {
        enableHiding: false,
        enableColumnDragging: false,
        enablePinning: true,
        enableResizing: false,
        headerVisible: false,
        enableSorting: false
      }
    }),
    [expandedRows, handleToggleRow]
  )

  const { table, sensors, handleDragStart, handleDragEnd, handleDragCancel, activeHeader } =
    useTable({
      data,
      columns: collapsibleRows ? [expandColumn, ...columns] : columns,
      withSelect,
      totalCount,
      defaultPageIndex,
      defaultPageSize,
      defaultHiddenColumns,
      onSortChange,
      onRowSelection,
      onColumnSizing,
      onPaginationChange
    })

  const header = renderHeader?.(table)
  const footer = renderFooter?.(table)

  const getCommonPinningStyles = (column: Column<TData>): CSSProperties => {
    const isPinned = column.getIsPinned();

    return {
      left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
      right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
      position: isPinned ? 'sticky' : 'relative',
      backgroundColor: isPinned ? 'white' : undefined,
      minWidth: column.getSize(),
      zIndex: isPinned ? 1 : 0,
    };
  };

  const handleRowClick = (column: Column<TData>, row: Row<TData>) => {
    if (column.id !== ColumnId.Actions && column.id !== ColumnId.Select && onRowClick) {
      onRowClick(row);
    }
  };

  const tableStyle = useMemo(
    () => ({
      minWidth: data?.length ? table.getCenterTotalSize() : undefined
    }),
    [data?.length, table]
  )

  return (
    <div
      className={classnames('advanced-table', {
        'with-border': withBorder
      })}
    >
      {header}
      <div className="advanced-table__inner scrollbar scrollbar--horizontal scrollbar--vertical">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div>
            <table style={tableStyle}>
              {!data?.length || hasError ? (
                <Empty
                  mainMessage={emptyTitle}
                  paragraphMessage={emptySubTitle}
                  illustration={emptyIllustration}
                />
              ) : (
                <>
                  <thead className="advanced-table__thead">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        <SortableContext
                          items={headerGroup.headers.map((header) => header.id)}
                          strategy={horizontalListSortingStrategy}
                        >
                          {headerGroup.headers.map((header) => {
                            if (header.id === ColumnId.Actions && !isActionsVisible) return null
                            return (
                              <ColumnHeader
                                pinnedStyles={{ ...getCommonPinningStyles(header.column) }}
                                key={header.id}
                                header={header}
                              />
                            )
                          })}
                        </SortableContext>
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <React.Fragment key={row.id}>
                        <tr className={classnames({ selected: row.getIsSelected() })}>
                          {row.getVisibleCells().map((cell) => (
                            <td
                              className={classnames({
                                'with-checkbox': cell.column.id === ColumnId.Select,
                                'pinned-cell': cell.column.getIsPinned(),
                                'action-column':
                                  cell.column.id === ColumnId.Actions && !isActionsVisible,
                                'expand-column': cell.column.id === ColumnId.Expand
                              })}
                              id={cell.id}
                              key={cell.id}
                              onClick={() => handleRowClick(cell.column, row)}
                              style={{ ...getCommonPinningStyles(cell.column) }}
                            >
                              {isLoading ? (
                                <Skeleton />
                              ) : cell.column.id === ColumnId.Actions && !isActionsVisible ? (
                                <div className="actions-list__right">
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </div>
                              ) : (
                                flexRender(cell.column.columnDef.cell, cell.getContext())
                              )}
                            </td>
                          ))}
                        </tr>
                        {collapsibleRows && expandedRows.has(row.id) && renderExpandedContent && (
                          <tr className="advanced-table__expanded-row">
                            <td colSpan={row.getVisibleCells().length}>
                              {renderExpandedContent(row)}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          </div>
          <DragOverlay dropAnimation={null}>
            {activeHeader && (
              <table style={{ width: activeHeader.getSize() }}>
                <thead>
                  <tr>
                    <th className="draggable-col" style={{ width: activeHeader.getSize() }}>
                      <Text weight={'bold'}>
                        {flexRender(
                          activeHeader.column.columnDef.header,
                          activeHeader.getContext()
                        )}
                      </Text>
                    </th>
                  </tr>
                </thead>
              </table>
            )}
          </DragOverlay>
        </DndContext>
      </div>
      {!!data.length && !hasError && footer}
    </div>
  )
}
