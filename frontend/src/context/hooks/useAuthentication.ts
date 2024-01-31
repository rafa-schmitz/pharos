import {useState, useEffect} from 'react'
import {User} from '../../types/user'
import axios, {axiosPrivate} from '../../services/axios'
import {useNavigate} from 'react-router-dom'
import {refresh} from '../utils/refreshToken'
import {handleSessionLogin} from '../utils/handleSessionLogin'
import {revokeToken} from '../utils/revokeToken'
import {RequestToken} from '../../types/auth'
import {getCookie, removeCookie, setCookie} from '../utils/cookies'
const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()


  useEffect(() => {
    handleSessionLogin(setIsAuthenticated).then(res => {
      if (!res) return
      setUser(res)
    })
      .finally(() => setLoading(false))
  }, [])

  const handleAuthentication = async (username: string, password: string) => {
    const body = {
      username: username,
      password: password
    }
    const {accessToken, refreshToken}: RequestToken = await (await axios.post("/login", body, {
      withCredentials: true
    })).data
    axiosPrivate.defaults.headers.common['Authorization'] = "Bearer " + accessToken
    const expiresTime = Number(process.env.REACT_APP_EXPIRATION)
    setCookie("token", {accessToken, refreshToken}, expiresTime)
    setIsAuthenticated(true)
    return true
  }

  const handleLogout = async () => {
    try {
      setLoading(true)
      await revokeToken()
      setUser({} as User)
      setIsAuthenticated(false)
      removeCookie("token")
      axios.defaults.headers.common['Authorization'] = undefined
      setTimeout(() => {
        setLoading(false)
        navigate("/login")
      }, 1000)
    } catch (error) {
      console.error(error);
    }
  }

  const handleRefreshToken = async () => {
    let isRefreshing: boolean = false;
    let refreshPromise:Promise<string | undefined>| null = null

    axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevReq = error?.config;

        if (error.response.status === 401 && !prevReq?._retry) {
          prevReq._retry = true;

          if (!isRefreshing) {
            isRefreshing = true;
            refreshPromise = refresh(setUser, navigate, setIsAuthenticated, setLoading)
              .finally(() => {
                isRefreshing = false;
                refreshPromise = null;
              });
          }

          await refreshPromise;

          const token = getCookie("token");
          prevReq.headers['Authorization'] = `Bearer ${token?.accessToken}`;

          return axiosPrivate(prevReq);
        }

        return Promise.reject(error);
      }
    );
  }

  return {
    isAuthenticated,
    setIsAuthenticated,
    handleAuthentication,
    handleLogout,
    user,
    setUser,
    loading,
    setLoading,
    handleRefreshToken
  }

}

export default useAuthentication;