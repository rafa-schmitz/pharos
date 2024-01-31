import axios, {axiosPrivate} from "./axios";
import {Content, Jobs, Logo, QueryParamsJobs, SearchJobsPayLoad} from '../types/jobs'
import {Job} from '../types/jobContext'

export const search = async (
  payload:SearchJobsPayLoad,
  queryParams?: QueryParamsJobs
) => {
  let endpoint: string

  switch (queryParams) {
    case 'sortByCreatedAtDesc':
      endpoint = `/jobs?size=6&page=${payload?.page}&sort=createdAt,DESC`
      break;
    case 'sortByCreatedAtAsc':
      endpoint = `/jobs?size=6&page=${payload?.page}&sort=createdAt,ASC`
      break;

    case 'searchJobsByUserId':
      if(payload?.userId) endpoint = `/jobs?size=6&page=${payload?.page}&createdBy=${payload?.userId}`
      else endpoint = '/jobs?size=6&page=' + payload?.page
      break;
    default:
      endpoint = '/jobs?size=6&page='+ payload?.page
  }

  const responseData: Jobs = await (await axios.get(endpoint)).data
  return responseData
}

export const getJob = async (id: string) => {
  const responseData: Content = await (await axios.get(`/jobs/${id}`)).data
  return responseData
}

export const createJob = async (body: Job) => {
  const responseData: Content = await (await axiosPrivate.post(`/jobs/create`, body, {})).data
  return responseData
}

export const uploadFileJob = async (id: number, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const responseData: Logo = await (await axiosPrivate.post(`/jobs/${id}/files`, formData)).data
  return responseData;
};
export const deletejob = async (id:number) => await axiosPrivate.delete(`/jobs/${id}/delete`)
