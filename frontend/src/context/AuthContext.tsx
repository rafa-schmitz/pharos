import React from 'react'
import { createContext, ReactNode, useContext, useEffect } from 'react'
import { User } from '../types/user'
import useAuthentication from './hooks/useAuthentication'
import { Spinner } from '@chakra-ui/react'

interface IAuthContextProvider {
  children: ReactNode
}

interface IAuthContext {
  isAuthenticated: boolean
  handleAuthentication: (username: string, password: string) => Promise<boolean>
  handleLogout: () => void
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext({} as IAuthContext)

export const AuthProvider = ({ children }: IAuthContextProvider) => {
  const {
    isAuthenticated,
    handleAuthentication,
    handleRefreshToken,
    handleLogout, user,
    setUser,
    loading,
    setLoading
  } = useAuthentication()


  useEffect(() => {
    handleRefreshToken()
  })

  if (loading) {
    return (
      <Spinner
        style={{ position: 'absolute', top: "30vh", left: "50%" }}
        thickness='4px'
        speed='0.65s'
        emptyColor='#fff'
        color='#9b34ef'
        width="60px"
        height="60px"
      />
    )
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleAuthentication, handleLogout, user, setUser, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext);