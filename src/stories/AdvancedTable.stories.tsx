import React from 'react'
import {
  AdvancedTable as _Table,
  AdvancedPagination,
  ColumnSettings,
  Button,
  IconDelete,
  IconEdit,
  IconAdd,
  Status,
  Chips
} from '../index'
import { StoryFn } from '@storybook/react'
import { TTableProps } from '../components/AdvancedTable/types'
import { ColumnDef } from '@tanstack/react-table'

const data: any[] = [
  {
    user: 'Luke Skywalker',
    age: 21,
    id: 'fffffffsdf',
    visits: [7, 8, 9],
    progress: 'fdfsdfsdfsd',
    status: 'Active'
  },
  ...Array(33).fill({
    user: 'John Doe',
    age: 30,
    id: 'dsfsdf',
    visits: [4, 5, 6],
    progress: 'divv',
    status: 'Active'
  }),
  {
    user: 'John Doe',
    age: 30,
    id: 'dsfsdf',
    visits: [4, 5, 6],
    progress: 'divv',
    status: 'Active'
  },
  {
    user: 'Bruce wayne',
    id: 'fffffffeeeee',
    age: 29,
    visits: [1, 2, 3],
    progress: 'diff',
    status: 'Active'
  }
]

const Template: StoryFn<TTableProps<any>> = (args) => {
  const columns: ColumnDef<any>[] = [
    {
      id: 'user',
      header: 'User',
      accessorKey: 'user'
    },
    {
      header: 'Status',
      id: 'status',
      accessorKey: 'status',
      cell: (row) => <Chips text={'Created'} type={'accent'} color={'information'} />
    },
    {
      id: 'age',
      accessorKey: 'age',
      header: 'Age'
    },
    {
      header: 'Profile Progress',
      id: 'progress',
      accessorKey: 'progress'
    },
    {
      header: 'Test 1',
      id: 'test_1',
      accessorKey: 'visits'
    },
    {
      header: 'Test 2',
      id: 'test 2',
      accessorKey: 'visits'
    },
    {
      header: 'Test 3',
      id: 'test_3',
      accessorKey: 'visits'
    },
    {
      header: 'Test 4',
      id: 'test_4',
      accessorKey: 'visits'
    },
    {
      header: 'Test 5',
      id: 'test_5',
      accessorKey: 'visits'
    },
    {
      header: 'Visits',
      id: 'visits',
      accessorKey: 'visits'
    },
    {
      header: 'Actions',
      id: 'actions',
      accessorKey: 'actions',
      cell: () => (
        <div className="flexbox align-items--center">
          <Button className="mr-8" iconProps={{ Component: IconAdd }} type="secondary" />
          <Button className="mr-8" iconProps={{ Component: IconEdit }} type="secondary" />
          <Button iconProps={{ Component: IconDelete }} type="secondary" />
        </div>
      )
    }
  ]

  return (
    <div style={{ height: '95vh' }}>
      <_Table
        {...args}
        data={data}
        columns={columns}
        emptyTitle="Empty title"
        emptySubTitle="Please try to reload the page or use another keyword."
        renderHeader={(table) => (
          <div className="advanced-table__header justify-content--end">
            <ColumnSettings hiddenColumnSettings={['select', 'actions']} table={table} />
          </div>
        )}
        renderFooter={(table) => (
          <div className="advanced-table__footer">
            <AdvancedPagination table={table} totalCount={1000} />
          </div>
        )}
      />
    </div>
  )
}

export default {
  title: 'AdvancedTable',
  component: _Table
}

export const AdvancedTable = Template.bind({})

AdvancedTable.args = {
  withSelect: true,
  data: [],
  columns: [],
  withBorder: false,
  onSortChange: (state) => console.log(state),
  onRowSelection: (state) => console.log(state),
  onPaginationChange: (state) => console.log(state),
  onRowClick: (row) => console.log(row)
}
