import { userApi } from '@/api/user'
import { UserWithoutPassword } from '@/api/user/type'
import {} from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable, TableDropdown } from '@ant-design/pro-components'
import { Space, Tag } from 'antd'
import { useRef } from 'react'
import CommitModal from './CommitModal'

const columns: ProColumns<UserWithoutPassword>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
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
    title: 'Role',
    dataIndex: 'role',
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_)
    },
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
    title: 'CreateTime',
    key: 'createTime',
    dataIndex: 'createTime',
    valueType: 'date',
    sorter: true
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (_, record, __, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id)
        }}
      >
        编辑
      </a>,
      <CommitModal key="modal" type="update" />,
      <TableDropdown
        key="actionGroup"
        onSelect={async (key: string) => {
          if (key === 'reset') {
            console.log(key)
          } else if (key === 'delete') {
            console.log(record)
            await userApi.delete({ id: record.id })
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
        const res = await userApi.search()
        return {
          data: res.data,
          success: res.success,
          total: res.data.length
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
      toolBarRender={() => [<CommitModal type="create" />]}
    />
  )
}

export default Comment
