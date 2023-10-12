import { LoginData } from '@/api/user/type'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface userInfoState {
  userInfo: LoginData | null
  setUserInfo: (info: userInfoState['userInfo']) => void
}

const useUserInfoStore = create<userInfoState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (userInfo) => set(() => ({ userInfo }))
    }),
    { name: 'userInfo' }
  )
)

export default useUserInfoStore
