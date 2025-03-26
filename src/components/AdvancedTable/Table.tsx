import type { CSSProperties } from 'react';
import type { Column} from '@tanstack/react-table';
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

export function Table<TData>({
  data,
  columns,
  isLoading,
  hasError,
  tableHeight = '70vh',
  columnPinning,
  emptyTitle,
  emptySubTitle,
  emptyIllustration,
  withSelect = false,
  withBorder = true,
  reloadAction,
  reloadButtonText,
  reloadButtonIcon,
  defaultPageIndex,
  defaultPageSize,
  renderHeader,
  renderFooter,
  onSortChange,
  onRowSelection,
  onColumnSizing,
  onPaginationChange
}: TTableProps<TData>) {
  const { table, sensors, handleDragStart, handleDragEnd, handleDragCancel, activeHeader } =
    useTable({
      data,
      columns,
      withSelect,
      columnPinning,
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
  return (
    <div
      className={classNames('advanced-table', {
        'with-border': withBorder
      })}
    >
      {header}
      <div
        style={{ height: tableHeight }}
        className="advanced-table__inner scrollbar scrollbar--horizontal scrollbar--vertical"
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div>
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
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        <SortableContext
                          items={headerGroup.headers.map((header) => header.id)}
                          strategy={horizontalListSortingStrategy}
                        >
                          {headerGroup.headers.map((header) => (
                            <ColumnHeader
                              pinnedStyles={{ ...getCommonPinningStyles(header.column) }}
                              key={header.id}
                              header={header}
                            />
                          ))}
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
                              ['with-checkbox']: cell.column.id === 'select',
                              ['pinned-cell']: cell.column.getIsPinned()
                            })}
                            id={cell.id}
                            key={cell.id}
                            style={{ ...getCommonPinningStyles(cell.column) }}
                          >
                            {isLoading ? (
                              <Skeleton />
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
