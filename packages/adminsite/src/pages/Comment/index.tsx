import { userApi } from '@/api/user'
import { UserWithoutPassword } from '@/api/user/type'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable, TableDropdown } from '@ant-design/pro-components'
import { Button, Dropdown, Space, Tag } from 'antd'
import { useRef } from 'react'

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
    search: false,
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
      admin: {
        text: 'admin'
      },
      user: {
        text: 'user'
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
      <a key="view">查看</a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
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
          const { index, ...params } = record
          await userApi.update(params)
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
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime]
            }
          }
          return values
        }
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page)
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload()
          }}
          type="primary"
        >
          新建
        </Button>
      ]}
    />
  )
}

export default Comment
