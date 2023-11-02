import { Article, ArticleSearchFilters } from '@/api/article/type'
import { Space, Table, Tag } from 'antd'

const { Column } = Table

interface DataType {
  key: React.Key
  firstName: string
  lastName: string
  age: number
  address: string
  tags: string[]
}

const data: DataType[] = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

interface ArticleTableBarProps {
  article: Article[]
  search: () => void
  searchParams: ArticleSearchFilters & { orderBy?: 'asc' | 'desc' }
  setSearchParams: React.Dispatch<React.SetStateAction<ArticleTableBarProps['searchParams']>>
}

const ArticleTableBar: React.FC<ArticleTableBarProps> = () => (
  <Table dataSource={data}>
    <Column title="Age" dataIndex="age" key="age" />
    <Column title="Age" dataIndex="age" key="age" />
    <Column title="Address" dataIndex="address" key="address" />
    <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={(tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )}
    />
    <Column
      title="Action"
      key="action"
      render={(_, record: DataType) => (
        <Space size="middle">
          <a>Invite {record.lastName}</a>
          <a>Delete</a>
        </Space>
      )}
    />
  </Table>
)

export default ArticleTableBar
