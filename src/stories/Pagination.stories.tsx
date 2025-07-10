import React from 'react'
import { Pagination as _Pagination } from '../index'
import { StoryFn } from '@storybook/react'
import { TPaginationProps } from '../components/Pagination/types'

export default {
  title: 'Pagination',
  component: _Pagination,
  argTypes: {}
}
const Template: StoryFn<TPaginationProps> = ({ pageSize, ...args }) => (
  <_Pagination
    pageSize={10}
    {...args}
    handleChangePage={(item) => {
      console.log(item)
    }}
    totalCount={286}
    classname=""
  />
)

export const Pagination = Template.bind({})

// @ts-ignore
Pagination.args = {
  totalCount: 100
}
