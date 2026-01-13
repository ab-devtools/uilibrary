import React, { useEffect, useState } from 'react'
import type { Table } from '@tanstack/react-table'
import { Input } from '../Input'
import { Button } from '../Button'
import { Select } from '../Select'
import { Text } from '../Text'
import classnames from 'classnames'
import { OPTIONS } from './constants'
import IconChevronLeft from '../SVGIcons/IconChevronLeft'
import IconChevronRight from '../SVGIcons/IconChevronRight'
import IconChevronDoubleLeft from '../SVGIcons/IconChevronDoubleLeft'
import IconChevronDoubleRight from '../SVGIcons/IconChevronDoubleRight'
import IconMore from '../SVGIcons/IconMore'
import type { TItemValue } from '../../types/globalTypes'

interface PaginationProps<T> {
  table: Table<T>
  totalCount: number
  buttonText?: string
}

export function AdvancedPagination<TData>({
  table,
  totalCount,
  buttonText
}: PaginationProps<TData>) {
  const [navigatePage, setNavigatePage] = useState<string>('1')
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize

  const onNavigateToPage = (page: string) => {
    if (!page || (/^[1-9]\d*$/.test(page) && table.getPageCount() >= Number(page))) {
      setNavigatePage(page)
    }
  }

  const onGoToPage = () => {
    const page = navigatePage ? Number(navigatePage) - 1 : 0
    table.setPageIndex(page)
  }

  const onRowCountChange = (value?: TItemValue) => {
    if (value) {
      table.setPagination({
        pageIndex: 0,
        pageSize: Number(value)
      })
    }
  }

  const getVisiblePageNumbers = () => {
    const currentPage = pageIndex
    const totalPages = table.getPageCount()
    const visiblePages: (number | string)[] = []

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    visiblePages.push(1)

    if (currentPage <= 3) {
      visiblePages.push(2, 3, 4, 5, '+++', totalPages)
    } else if (currentPage > totalPages - 5) {
      visiblePages.push(
        '---',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      )
    } else {
      visiblePages.push('---', currentPage, currentPage + 1, currentPage + 2, '+++', totalPages)
    }

    return visiblePages
  }

  useEffect(() => {
    if (table.getPageCount() < Number(navigatePage)) {
      setNavigatePage('1')
    }
  }, [table.getPageCount(), table.getState().pagination])

  return (
    <div className="advanced-table__pagination">
      <Select
        setSelectedItem={(value) => onRowCountChange(value)}
        selectedItem={`${pageSize}`}
        className={'no-border'}
        options={OPTIONS}
      />
      <div className={'advanced-table__pagination__right'}>
        <Text type={'tertiary'}>
          {pageIndex * pageSize + 1} - {(pageIndex + 1) * pageSize} / {totalCount}
        </Text>
        <div className="flexbox align-items--center">
          <Input
            currentValue={navigatePage}
            size="small"
            onChange={(e) => onNavigateToPage(e.target.value)}
            className="advanced-table__pagination__right__input mr-8"
          />
          <Button
            onClick={onGoToPage}
            type="secondary"
            size="medium"
            buttonText={buttonText ?? 'Go to page'}
          />
        </div>
        <ul className="pagination">
          <li className={`previous ${!table.getCanPreviousPage() ? 'disabled' : ''}`}>
            <a rel={'prev'} role={'button'} onClick={() => table.firstPage()}>
              <IconChevronDoubleLeft size={'small'} />
            </a>
          </li>
          <li className={`previous ${!table.getCanPreviousPage() ? 'disabled' : ''}`}>
            <a rel={'prev'} role={'button'} onClick={() => table.previousPage()}>
              <IconChevronLeft size={'small'} />
            </a>
          </li>

          {getVisiblePageNumbers().map((pageNumber, index) =>
            pageNumber === '---' ? (
              <li key={`ellipsis-${index}`} className={'pagination__more'}>
                <a role={'button'} onClick={() => table.setPageIndex(+pageIndex - 3)}>
                  <IconMore size={'small'} />
                </a>
              </li>
            ) : pageNumber === '+++' ? (
              <li key={`ellipsis-${index}`} className={'pagination__more'}>
                <a role={'button'} onClick={() => table.setPageIndex(+pageIndex + 3)}>
                  <IconMore size={'small'} />
                </a>
              </li>
            ) : (
              <li
                className={classnames({
                  ['active']: pageNumber === pageIndex + 1
                })}
                key={pageNumber}
              >
                <a role={'button'} onClick={() => table.setPageIndex(+pageNumber - 1)}>
                  {pageNumber}
                </a>
              </li>
            )
          )}

          <li className={`next ${!table.getCanNextPage() ? 'disabled' : ''}`}>
            <a rel={'next'} role={'button'} onClick={() => table.nextPage()}>
              <IconChevronRight size={'small'} />
            </a>
          </li>
          <li className={`next ${!table.getCanNextPage() ? 'disabled' : ''}`}>
            <a rel={'next'} role={'button'} onClick={() => table.lastPage()}>
              <IconChevronDoubleRight size={'small'} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
