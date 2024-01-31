import React from "react";
import axios, { axiosPrivate } from '../../services/axios'
import { NavigateFunction } from 'react-router-dom'
import { RequestToken } from '../../types/auth'
import { User } from '../../types/user'
import { getCookie, setCookie } from "./cookies";

export const refresh = async (
  setUser: React.Dispatch<React.SetStateAction<User>>,
  navigate: NavigateFunction,
  setIsAuthenticated: (value: React.SetStateAction<boolean>) => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const token = getCookie("token")

    if (!token) {
      setLoading(true)
      setUser({} as User)
      setIsAuthenticated(false)
      setTimeout(() => {
        setLoading(false)
        navigate("/login")
      },1000)
      return
    }

    const body = {
      refreshToken: token.refreshToken
    }

    const resfreshToken = await axios.post<RequestToken>('/login/refresh', body, { withCredentials: true })
      .then((res) => {
        const { accessToken, refreshToken } = res.data

        const expiresTime = Number(process.env.REACT_APP_EXPIRATION)
        setCookie("token", { accessToken, refreshToken }, expiresTime);
        axiosPrivate.defaults.headers.common.Authorization = "Bearer " + accessToken
        return accessToken;

      });

    return resfreshToken;
    
  } catch (error) {
  }
}