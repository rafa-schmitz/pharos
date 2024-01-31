import {axiosPrivate} from "./axios";
import {AppliedJobs} from '../types/appliedJobs'

export const createAppliedJob = async (jobId:number) => {
  const responseData:AppliedJobs = await (await axiosPrivate.post(`/applied-jobs/job/${jobId}`,{
  })).data
  return responseData
}
export const searchAppliedJobsByUserId = async () => {
  const responseData:AppliedJobs[] = await (await axiosPrivate.get(`/applied-jobs`,{
  })).data
  return responseData
}

export const existAppliedJob = async (jobId:number) => {
  const responseData:boolean = await (await axiosPrivate.get(`/applied-jobs/exist/job/${jobId}`)).data
  return responseData;
}