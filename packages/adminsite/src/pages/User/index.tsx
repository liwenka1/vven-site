import { useCallback, useEffect, useState } from 'react'
import UserSearchBar from './UserSearchBar'
import UserTableBar from './UserTableBar'
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
      <UserSearchBar search={search} searchParams={searchParams} setSearchParams={setSearchParams} />
      <UserTableBar users={users} search={search} searchParams={searchParams} setSearchParams={setSearchParams} />
    </>
  )
}

export default User
