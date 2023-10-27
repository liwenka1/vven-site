import { UserWithoutPassword } from '@/api/user/type'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface userInfoState {
  token: string | null
  setToken: (token: userInfoState['token']) => void
  profile: UserWithoutPassword | null
  setProfile: (info: userInfoState['profile']) => void
}

const useUserInfoStore = create<userInfoState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set(() => ({ token })),
      profile: null,
      setProfile: (profile) => set(() => ({ profile }))
    }),
    { name: 'userInfo' }
  )
)

export default useUserInfoStore
