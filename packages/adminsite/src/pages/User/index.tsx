import { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import TableBar from './TableBar'
import { userApi } from '@/api/user'
import { UserParams, UserInfo } from '@/api/user/type'

const User = () => {
  useEffect(() => {
    select()
  }, [])

  const [users, setUsers] = useState<UserInfo[]>([])
  const select = async (params?: UserParams) => {
    const res = await userApi.select(params)
    setUsers(res.data)
  }

  return (
    <>
      <SearchBar select={select} />
      <TableBar users={users} select={select} />
    </>
  )
}

export default User
