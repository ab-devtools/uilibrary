import React from 'react'
import {
  AdvancedTable as _Table,
  AdvancedPagination,
  ColumnSettings,
  Button,
  IconDelete,
  IconSend,
  IconEdit
} from '../index'
import { StoryFn } from '@storybook/react'
import { ICellProps, TTableProps } from '../components/AdvancedTable/types'
import { ColumnDef, Row } from '@tanstack/react-table'

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
      accessorKey: 'status'
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
      header: 'Visits',
      id: 'visits',
      accessorKey: 'visits'
    }
  ];

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
  onPaginationChange: (state) => console.log(state)
}
