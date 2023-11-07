import { Article, ArticleSearchFilters, ArticleWithTag, Tag } from '@/api/article/type'
import { Space, Table, Tag as AntdTag, Button, Popconfirm } from 'antd'
import { TableProps } from 'antd/lib'
import { useState } from 'react'
import ArticleModal from './ArticleModal'

const { Column } = Table

interface ArticleTableBarProps {
  article: ArticleWithTag[]
  search: () => void
  searchParams: ArticleSearchFilters
  setSearchParams: React.Dispatch<React.SetStateAction<ArticleTableBarProps['searchParams']>>
  tags: Tag[]
}

const ArticleTableBar: React.FC<ArticleTableBarProps> = ({ article, search, searchParams, setSearchParams, tags }) => {
  const onChange: TableProps<Article>['onChange'] = (_, __, sorter) => {
    if (!Array.isArray(sorter)) {
      const { field, order } = sorter
      if (field === 'updateTime') {
        setSearchParams({ ...searchParams, orderBy: { updateTime: order === 'descend' ? 'desc' : 'asc' } })
      } else if (field === 'createTime') {
        setSearchParams({ ...searchParams, orderBy: { createTime: order === 'descend' ? 'desc' : 'asc' } })
      } else {
        setSearchParams({ ...searchParams, orderBy: undefined })
      }
      search()
    }
  }

  const confirm = async (article: ArticleWithTag) => {
    console.log(article, 'article')
    search()
  }
  const cancel = () => {
    console.log('cancel')
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialValues, setInitialValues] = useState<ArticleWithTag>()
  const showModal = (article: ArticleWithTag) => {
    console.log(article, 'article')
    setInitialValues(article)
    setIsModalOpen(true)
  }

  return (
    <>
      <Table dataSource={article} rowKey="id" onChange={onChange}>
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Author" dataIndex="author" key="author" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column title="Update Time" dataIndex="updateTime" key="updateTime" sorter />
        <Column title="Create Time" dataIndex="createTime" key="createTime" sorter />
        <Column
          title="IsFeatured"
          dataIndex="isFeatured"
          key="isFeatured"
          render={(isFeatured: boolean) => <AntdTag color="blue">{isFeatured ? '是' : '否'}</AntdTag>}
        />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags: Tag[]) => (
            <>
              {tags.map((tag) => (
                <AntdTag color="blue" key={tag.id}>
                  {tag.name}
                </AntdTag>
              ))}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(article: ArticleWithTag) => (
            <Space size="middle">
              <Button type="link" onClick={() => showModal(article)}>
                Invite
              </Button>
              <Popconfirm
                placement="bottom"
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => confirm(article)}
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
      <ArticleModal
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

export default ArticleTableBar
