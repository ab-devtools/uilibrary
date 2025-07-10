import type { JSX } from 'react'
import React from 'react'
import ReactPaginate from 'react-paginate'
import { PAGE_RANGE_DISPLAYED } from './consts'
import type { TPaginationProps } from './types'
import classNames from 'classnames'
import IconChevronRight from '../SVGIcons/IconChevronRight'
import IconChevronLeft from '../SVGIcons/IconChevronLeft'
import IconMore from '../SVGIcons/IconMore'

export const Pagination = (props: TPaginationProps): JSX.Element | null => {
  const {
    totalCount,
    handleChangePage,
    classname = '',
    pageSize,
    disableInitialCallback = false,
    page,
    breakLabel = <IconMore size={'small'} />,
    labels = {
      previous: <IconChevronLeft size={'small'} />,
      next: <IconChevronRight size={'small'} />
    }
  } = props

  const handlePageChange = ({ selected }: { selected: number }) => {
    handleChangePage(selected + 1)
  }

  return (
    <div className="pagination-wrapper flexbox">
      <ReactPaginate
        pageCount={Math.ceil(totalCount / pageSize)}
        disableInitialCallback={disableInitialCallback}
        pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName={classNames('pagination', classname)}
        activeClassName={'active'}
        previousLabel={labels?.previous}
        nextLabel={labels?.next}
        breakClassName="pagination__more"
        breakLinkClassName="pagination__more__link"
        breakLabel={breakLabel}
        {...(page ? { forcePage: page - 1 } : {})}
      />
    </div>
  )
}
