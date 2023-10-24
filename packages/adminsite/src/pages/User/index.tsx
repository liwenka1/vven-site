import { useCallback, useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import TableBar from './TableBar'
import { userApi } from '@/api/user'
import { UserSearchFilters, UserWithoutPassword } from '@/api/user/type'

const User = () => {
  const [users, setUsers] = useState<UserWithoutPassword[]>([])
  const [searchParams, setSearchParams] = useState<UserSearchFilters & { orderBy?: 'asc' | 'desc' }>({})
  const search = useCallback(async () => {
    const res = await userApi.search(searchParams)
    setUsers(res.data)
  }, [searchParams])

  useEffect(() => {
    search()
  }, [search])

  return (
    <>
      <SearchBar search={search} searchParams={searchParams} setSearchParams={setSearchParams} />
      <TableBar users={users} search={search} searchParams={searchParams} setSearchParams={setSearchParams} />
    </>
  )
}

export default User
