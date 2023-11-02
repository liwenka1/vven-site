import { useCallback, useEffect, useState } from 'react'
import ArticleSearchBar from './ArticleSearchBar'
import ArticleTableBar from './ArticleTableBar'
import { Article, ArticleSearchFilters } from '@/api/article/type'
import { articleApi } from '@/api/article'

interface ArticlePageProps {
  type: 'ARTICLE' | 'DRAFT'
}

const ArticlePage: React.FC<ArticlePageProps> = ({ type }) => {
  const isDraft: { [key in ArticlePageProps['type']]: boolean } = {
    ARTICLE: true,
    DRAFT: false
  }
  const [article, setArticle] = useState<Article[]>([])
  const [searchParams, setSearchParams] = useState<ArticleSearchFilters>({ isDraft: isDraft[type] })
  const search = useCallback(async () => {
    const res = await articleApi.search(searchParams)
    setArticle(res.data)
  }, [searchParams])

  useEffect(() => {
    search()
  }, [search])

  return (
    <>
      <ArticleSearchBar search={search} searchParams={searchParams} setSearchParams={setSearchParams} />
      <ArticleTableBar
        article={article}
        search={search}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </>
  )
}

export default ArticlePage
