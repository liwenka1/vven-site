import React, { useState } from 'react'
import { Button, Popconfirm, Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd/es/table'
import { UserInfo, UserParams } from '@/api/user/type'
import { userApi } from '@/api/user'
import UserModal from './UserModal'

const { Column } = Table

interface TableBarProps {
  users: UserInfo[]
  search: () => void
  searchParams: UserParams & { orderBy?: 'asc' | 'desc' }
  setSearchParams: React.Dispatch<React.SetStateAction<TableBarProps['searchParams']>>
}

const TableBar: React.FC<TableBarProps> = ({ users, search, searchParams, setSearchParams }) => {
  const confirm = async (user: UserInfo) => {
    await userApi.delete(user)
    search()
  }

  const cancel = () => {
    console.log('cancel')
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialValues, setInitialValues] = useState<UserInfo>()
  const showModal = (user: UserInfo) => {
    console.log(user, 'user')

    setInitialValues(user)
    setIsModalOpen(true)
  }

  const onChange: TableProps<UserInfo>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
    if (!Array.isArray(sorter)) {
      if (sorter.order === 'descend') {
        setSearchParams({ ...searchParams, orderBy: 'desc' })
      } else if (sorter.order === 'ascend') {
        setSearchParams({ ...searchParams, orderBy: 'asc' })
      } else {
        setSearchParams({ ...searchParams, orderBy: undefined })
      }
      search()
    }
  }

  return (
    <>
      <Table dataSource={users} rowKey="id" onChange={onChange}>
        <Column title="Username" dataIndex="username" key="username" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Nickname" dataIndex="nickname" key="nickname" />
        <Column title="Create Time" dataIndex="create_time" key="create_time" sorter />
        <Column title="Role" dataIndex="role" key="role" render={(role) => <Tag color="blue">{role}</Tag>} />
        <Column
          title="Action"
          key="action"
          render={(user) => (
            <Space size="middle">
              <Button type="link" onClick={() => showModal(user)}>
                Invite
              </Button>
              <Popconfirm
                placement="bottom"
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => confirm(user)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button danger type="link">
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      <UserModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        search={search}
        initialValues={initialValues}
        type="UPDATE"
      />
    </>
  )
}

export default TableBar
