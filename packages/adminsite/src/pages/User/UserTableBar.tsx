import { useState } from 'react'
import { Button, Popconfirm, Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd/es/table'
import { UserWithoutPassword, UserSearchFilters } from '@/api/user/type'
import { userApi } from '@/api/user'
import UserModal from './UserModal'

const { Column } = Table

interface UserTableBarProps {
  users: UserWithoutPassword[]
  search: () => void
  searchParams: UserSearchFilters & { orderBy?: 'asc' | 'desc' }
  setSearchParams: React.Dispatch<React.SetStateAction<UserTableBarProps['searchParams']>>
}

const UserTableBar: React.FC<UserTableBarProps> = ({ users, search, searchParams, setSearchParams }) => {
  const confirm = async (user: UserWithoutPassword) => {
    await userApi.delete(user)
    search()
  }

  const cancel = () => {
    console.log('cancel')
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialValues, setInitialValues] = useState<UserWithoutPassword>()
  const showModal = (user: UserWithoutPassword) => {
    console.log(user, 'user')

    setInitialValues(user)
    setIsModalOpen(true)
  }

  const onChange: TableProps<UserWithoutPassword>['onChange'] = (_, __, sorter) => {
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
        <Column title="Create Time" dataIndex="createTime" key="createTime" sorter />
        <Column title="Role" dataIndex="role" key="role" render={(role) => <Tag color="blue">{role}</Tag>} />
        <Column
          title="Action"
          key="action"
          render={(user: UserWithoutPassword) => (
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
        key={initialValues?.id}
        initialValues={initialValues}
        type="UPDATE"
      />
    </>
  )
}

export default UserTableBar
