import { Article, ArticleSearchFilters } from '@/api/article/type'
import { Space, Table, Tag } from 'antd'
import { TableProps } from 'antd/lib'

const { Column } = Table

interface ArticleTableBarProps {
  article: Article[]
  search: () => void
  searchParams: ArticleSearchFilters
  setSearchParams: React.Dispatch<React.SetStateAction<ArticleTableBarProps['searchParams']>>
}

type Tags = {
  id: number
  name: string
}[]

const ArticleTableBar: React.FC<ArticleTableBarProps> = ({ article, search, searchParams, setSearchParams }) => {
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

  return (
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
        render={(isFeatured: boolean) => <Tag color="blue">{isFeatured ? '是' : '否'}</Tag>}
      />
      <Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={(tags: Tags) => (
          <>
            {tags.map((tag) => (
              <Tag color="blue" key={tag.id}>
                {tag.name}
              </Tag>
            ))}
          </>
        )}
      />
      <Column
        title="Action"
        key="action"
        render={(article: Article) => (
          <Space size="middle">
            <a>Invite {article.title}</a>
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>
  )
}

export default ArticleTableBar
