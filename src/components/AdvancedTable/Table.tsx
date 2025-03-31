import type { CSSProperties } from 'react'
import type { Column, Row } from '@tanstack/react-table'
import type { TTableProps } from './types'
import React from 'react'
import { flexRender } from '@tanstack/react-table'
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { ColumnHeader } from './ColumnHeader'
import Skeleton from 'react-loading-skeleton'
import { useTable } from './useTable'
import { Text } from '../Text'
import classnames from 'classnames'
import { Empty } from '../Empty'
import classNames from 'classnames'

enum ColumnId {
  Select = 'select',
  Actions = 'actions'
}

export function Table<TData>({
  data,
  columns,
  isLoading,
  hasError,
  totalCount = 0,
  tableHeight = '70vh',
  emptyTitle,
  emptySubTitle,
  emptyIllustration,
  withSelect = false,
  withBorder = true,
  reloadButtonText,
  reloadButtonIcon,
  defaultPageIndex,
  defaultPageSize,
  reloadAction,
  renderHeader,
  renderFooter,
  onSortChange,
  onRowClick,
  onRowSelection,
  onColumnSizing,
  onPaginationChange
}: TTableProps<TData>) {
  const { table, sensors, handleDragStart, handleDragEnd, handleDragCancel, activeHeader } =
    useTable({
      data,
      columns,
      withSelect,
      totalCount,
      defaultPageIndex,
      defaultPageSize,
      onSortChange,
      onRowSelection,
      onColumnSizing,
      onPaginationChange
    })

  const header = renderHeader?.(table)
  const footer = renderFooter?.(table)

  const getCommonPinningStyles = (column: Column<TData>): CSSProperties => {
    const isPinned = column.getIsPinned()

    return {
      left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
      right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
      position: isPinned ? 'sticky' : 'relative',
      backgroundColor: isPinned ? 'white' : undefined,
      width: column.getSize(),
      zIndex: isPinned ? 1 : 0
    }
  }

  const handleRowClick = (column: Column<TData>, row: Row<TData>) => {
    if (column.id !== ColumnId.Actions && column.id !== ColumnId.Select && onRowClick) {
      onRowClick(row)
    }
  }
  return (
    <div
      className={classNames('advanced-table', {
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
          <div style={{ maxHeight: '100%' }}>
            <table style={{ minWidth: data?.length && table.getCenterTotalSize() }}>
              {!data?.length && !hasError ? (
                <Empty mainMessage={emptyTitle} illustration={emptyIllustration} />
              ) : hasError ? (
                <Empty
                  mainMessage={emptyTitle}
                  paragraphMessage={emptySubTitle}
                  illustration={emptyIllustration}
                  buttonProps={{
                    buttonText: reloadButtonText,
                    iconProps: reloadButtonIcon,
                    onClick: reloadAction
                  }}
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
                            if (header.id !== ColumnId.Actions) {
                              return (
                                <ColumnHeader
                                  pinnedStyles={{ ...getCommonPinningStyles(header.column) }}
                                  key={header.id}
                                  header={header}
                                />
                              )
                            }
                          })}
                        </SortableContext>
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        className={classnames({ ['selected']: row.getIsSelected() })}
                        key={row.id}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            className={classnames({
                              ['with-checkbox']: cell.column.id === ColumnId.Select,
                              ['pinned-cell']: cell.column.getIsPinned(),
                              ['action-column']: cell.column.id === ColumnId.Actions
                            })}
                            id={cell.id}
                            key={cell.id}
                            onClick={() => handleRowClick(cell.column, row)}
                            style={{ ...getCommonPinningStyles(cell.column) }}
                          >
                            {isLoading ? (
                              <Skeleton />
                            ) : cell.column.id === ColumnId.Actions ? (
                              <div className="actions-list__right">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </div>
                            ) : (
                              flexRender(cell.column.columnDef.cell, cell.getContext())
                            )}
                          </td>
                        ))}
                      </tr>
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
