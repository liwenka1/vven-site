import { userApi } from '@/api/user'
import { UserSearchFilters, UserWithoutPassword } from '@/api/user/type'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable, TableDropdown } from '@ant-design/pro-components'
import { Space, Tag } from 'antd'
import { useRef } from 'react'
import CommitModal from './CommitModal'
import UserUploadFile from '../User/UserUploadFile'

const columns: ProColumns<UserWithoutPassword>[] = [
  {
    title: 'Id',
    dataIndex: 'id',
    editable: false,
    width: 48
  },
  {
    title: 'Username',
    dataIndex: 'username',
    copyable: true,
    ellipsis: true,
    tip: '过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项'
        }
      ]
    }
  },
  {
    title: 'Email',
    dataIndex: 'email',
    copyable: true,
    ellipsis: true,
    tip: '过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项'
        }
      ]
    }
  },
  {
    title: 'Nickname',
    dataIndex: 'nickname',
    copyable: true,
    ellipsis: true,
    tip: '过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项'
        }
      ]
    }
  },
  {
    disable: true,
    search: false,
    title: 'Role',
    dataIndex: 'role',
    render: (_, record) => (
      <Space>
        <Tag>{record.role}</Tag>
      </Space>
    ),
    valueType: 'select',
    valueEnum: {
      ADMIN: {
        text: 'ADMIN'
      },
      USER: {
        text: 'USER'
      }
    }
  },
  {
    disable: true,
    search: false,
    editable: false,
    title: 'Avatar',
    dataIndex: 'avatarUrl',
    render: (_, record, __, action) => (
      <Space>
        <UserUploadFile id={record.id} avatarUrl={record.avatarUrl} action={action} />
      </Space>
    )
  },
  {
    title: 'CreateTime',
    dataIndex: 'createTime',
    valueType: 'date',
    editable: false,
    sorter: true
  },
  {
    title: '操作',
    valueType: 'option',
    render: (_, record, __, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id)
        }}
      >
        编辑
      </a>,
      <CommitModal key="modal" initialValues={record} type="UPDATE" />,
      <TableDropdown
        key="actionGroup"
        onSelect={async (key: string) => {
          if (key === 'reset') {
            console.log(key)
          } else if (key === 'delete') {
            console.log(record)
            await userApi.delete({ id: record.id })
            action?.reload()
          }
        }}
        menus={[
          { key: 'reset', name: '重置密码' },
          { key: 'delete', name: '删除' }
        ]}
      />
    ]
  }
]

const Comment = () => {
  const actionRef = useRef<ActionType>()
  return (
    <ProTable<UserWithoutPassword>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(params, sort, filter)
        const keys = Object.keys(sort)
        const orderBy = {} as Record<string, 'asc' | 'desc'>
        for (const key of keys) {
          if (sort[key] === 'ascend') {
            orderBy[key] = 'asc'
          } else if (sort[key] === 'descend') {
            orderBy[key] = 'desc'
          }
        }
        let searchParams: UserSearchFilters = {}
        if (keys.length) {
          searchParams = { ...params, orderBy }
        } else {
          searchParams = { ...params }
        }
        const res = await userApi.search(searchParams)
        return {
          data: res.data.users,
          success: res.success,
          total: res.data.total
        }
      }}
      editable={{
        type: 'multiple',
        onSave: async (_, record) => {
          console.log('保存', record)
          delete record.index
          await userApi.update(record)
        }
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value)
        }
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto'
      }}
      options={{
        setting: {
          listsHeight: 400
        }
      }}
      form={{}}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page)
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [<CommitModal type="CREATE" />]}
    />
  )
}

export default Comment
