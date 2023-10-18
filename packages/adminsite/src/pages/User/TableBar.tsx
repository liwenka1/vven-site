import React from 'react'
import { Space, Table, Tag } from 'antd'
import { UserInfo } from '@/api/user/type'

const { Column } = Table

interface TableBarProps {
  users: UserInfo[]
}

const TableBar: React.FC<TableBarProps> = ({ users }) => {
  return (
    <Table dataSource={users} rowKey="username">
      <Column title="Username" dataIndex="username" key="username" />
      <Column title="Email" dataIndex="email" key="email" />
      <Column title="Nickname" dataIndex="nickname" key="nickname" />
      <Column title="Create Time" dataIndex="create_time" key="create_time" />
      <Column title="Role" dataIndex="role" key="role" render={(role) => <Tag color="blue">{role}</Tag>} />
      <Column
        title="Action"
        key="action"
        render={() => (
          <Space size="middle">
            <a>Invite</a>
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>
  )
}

export default TableBar
