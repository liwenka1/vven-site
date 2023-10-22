import React, { useState } from 'react'
import { Button, Popconfirm, Space, Table, Tag } from 'antd'
import { UserInfo } from '@/api/user/type'
import { userApi } from '@/api/user'
import CreateModal from './CreateModal'

const { Column } = Table

interface TableBarProps {
  users: UserInfo[]
  select: () => void
}

const TableBar: React.FC<TableBarProps> = ({ users, select }) => {
  const confirm = async (user: UserInfo) => {
    await userApi.delete(user)
    select()
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

  return (
    <>
      <Table dataSource={users} rowKey="id">
        <Column title="Username" dataIndex="username" key="username" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Nickname" dataIndex="nickname" key="nickname" />
        <Column title="Create Time" dataIndex="create_time" key="create_time" />
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
      <CreateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        select={select}
        initialValues={initialValues}
        type="UPDATE"
      />
    </>
  )
}

export default TableBar
