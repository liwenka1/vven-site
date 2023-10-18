import { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import TableBar from './TableBar'
import { userApi } from '@/api/user'
import { UserFilters, UserInfo } from '@/api/user/type'

const User = () => {
  useEffect(() => {
    getUser()
  }, [])

  const [users, setUsers] = useState<UserInfo[]>([])
  const getUser = async (params?: UserFilters) => {
    const res = await userApi.getUser(params)
    setUsers(res.data)
  }

  return (
    <>
      <SearchBar getUser={getUser} />
      <TableBar users={users} />
    </>
  )
}

export default User
