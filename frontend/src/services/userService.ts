import { User, Content, QueryPararamsUser, Photo, UserUpdate, ExperienceUpdate, Experience } from '../types/user'
import axios, { axiosPrivate } from './axios'
import { SignUpRequest } from '../types/form'
import {UpdatePassword} from "../types/updatePassword";


export const mySelf = async () => {
  const responseData: User = await (await axiosPrivate.get(`/users/myself`)).data
  return responseData
}

export const getUser = async (id: number) => {  
  const responseData: User = await (await axiosPrivate.get(`/users/${id}`)).data
  return responseData
}

export const saveUser = async (body: SignUpRequest) => {
  const responseData: User = await (await axios.post(`/users/create`, body,{
  })).data
  return responseData
}

export const getAllUsers = async (
  queryParams?: QueryPararamsUser
) => {
  let endpoint: string
  const queryParamName = queryParams?.queryParamName?.toLowerCase();
  const queryParamLastName = queryParams?.queryParamLastName?.toLowerCase();
  
  if (queryParamName && queryParamLastName) {
    endpoint = '/users?name=' + queryParamName + '&lastName=' + queryParamLastName
  }
  else if (queryParamName) {
    endpoint = '/users?name=' + queryParamName
  }
  else if (queryParamLastName) {
    endpoint = '/users?lastName=' + queryParamLastName
  }
  else {
    endpoint = '/users'
  }

  const responseData: Content = await (await axiosPrivate.get(endpoint)).data
  return responseData.content
}

export const uploadFileUser = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const responseData: Photo = await (await axiosPrivate.post(`/users/files`, formData)).data
  return responseData;
};

export const updateFileUser = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const responseData: Photo = await (await axiosPrivate.put(`/users/files/update`, formData)).data
  return responseData;
};

export const updatePasswordUser = async (body:UpdatePassword) => await axiosPrivate.put("/users/update/password", body)


export const deleteUser = async () => {
  await axiosPrivate.delete(`/users/delete`)
}

export const updateUser = async (body: UserUpdate) => {
  const responseData: User = await (await axiosPrivate.put(`/users/update`, body,)).data
  return responseData;
}

export const addUserExperience = async (body: ExperienceUpdate) => {
  const responseData: Experience = await (await axiosPrivate.post(`/experience/create`, body,)).data
  return responseData;
}

export const updateUserExperience = async (id: number, body: ExperienceUpdate) => {
  const responseData: Experience = await (await axiosPrivate.put(`/experience/${id}/update`, body,)).data
  return responseData;
}

export const deleteUserExperience = async (id: number) => {
  await axiosPrivate.delete(`/experience/${id}/delete`)
}