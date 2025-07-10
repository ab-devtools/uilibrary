import type { ReactElement } from 'react'

export type TPaginationProps = {
  labels?: {
    next: string | ReactElement
    previous: string | ReactElement
  }
  totalCount: number
  page?: number
  pageSize: number
  handleChangePage: (pageNumber: number) => void
  breakLabel?: ReactElement
  classname?: string
  disableInitialCallback?: boolean
}
