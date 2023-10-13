import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface userInfoState {
  token: string | null
  setToken: (token: string) => void
  userInfo: Record<string, unknown> | null
  setUserInfo: (info: userInfoState['userInfo']) => void
}

const useUserInfoStore = create<userInfoState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set(() => ({ token })),
      userInfo: null,
      setUserInfo: (userInfo) => set(() => ({ userInfo }))
    }),
    { name: 'userInfo' }
  )
)

export default useUserInfoStore
