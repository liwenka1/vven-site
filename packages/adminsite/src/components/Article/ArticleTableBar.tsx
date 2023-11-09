import { Article, ArticleSearchFiltersWithTag, ArticleWithTag, Tag } from '@/api/article/type'
import { Space, Table, Tag as AntdTag, Button, Popconfirm } from 'antd'
import { TableProps } from 'antd/lib'
import { useState } from 'react'
import ArticleModal from './ArticleModal'
import { articleApi } from '@/api/article'

const { Column } = Table

interface ArticleTableBarProps {
  article: ArticleWithTag[]
  search: () => void
  searchParams: ArticleSearchFiltersWithTag
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
    }
  }

  const confirm = async (article: ArticleWithTag) => {
    await articleApi.delete({ id: article.id })
    search()
  }
  const cancel = () => {
    console.log('cancel')
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialValues, setInitialValues] = useState<ArticleWithTag>()
  const showModal = (article: ArticleWithTag) => {
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
          render={(tags: string[]) => (
            <>
              {tags.map((tag) => (
                <AntdTag color="blue" key={tag}>
                  {tag}
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
        tags={tags}
        type="UPDATE"
      />
    </>
  )
}

export default ArticleTableBar
