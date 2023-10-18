import { useEffect } from 'react'
import SearchBar from './SearchBar'
import TableBar from './TableBar'
import { userApi } from '@/api/user'

const User = () => {
  useEffect(() => {
    userApi.all()
  }, [])

  return (
    <>
      <SearchBar />
      <TableBar />
    </>
  )
}

export default User
