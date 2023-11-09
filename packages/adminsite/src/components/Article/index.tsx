import { useCallback, useEffect, useState } from 'react'
import ArticleSearchBar from './ArticleSearchBar'
import ArticleTableBar from './ArticleTableBar'
import { ArticleSearchFiltersWithTag, ArticleWithTag } from '@/api/article/type'
import { articleApi, tagApi } from '@/api/article'

interface ArticlePageProps {
  type: 'ARTICLE' | 'DRAFT'
}

interface Tag {
  id: number
  name: string
}

const ArticlePage: React.FC<ArticlePageProps> = ({ type }) => {
  const isDraft: { [key in ArticlePageProps['type']]: boolean } = {
    ARTICLE: true,
    DRAFT: false
  }
  const [article, setArticle] = useState<ArticleWithTag[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [searchParams, setSearchParams] = useState<ArticleSearchFiltersWithTag>({ isDraft: isDraft[type] })
  const search = useCallback(async () => {
    const article = await articleApi.search(searchParams)
    setArticle(article.data)
    const tags = await tagApi.search()
    setTags(tags.data)
  }, [searchParams])

  useEffect(() => {
    search()
  }, [search])

  return (
    <>
      <ArticleSearchBar
        search={search}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        tags={tags}
      />
      <ArticleTableBar
        article={article}
        search={search}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        tags={tags}
      />
    </>
  )
}

export default ArticlePage
