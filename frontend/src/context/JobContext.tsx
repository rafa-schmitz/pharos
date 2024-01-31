import React from "react";
import { createContext, ReactNode, useContext, useState } from 'react'
import { Job } from '../types/jobContext'

interface IJobContextProvider {
  children: ReactNode 
}

interface IJobContext {
  jobInfo: Job;
  setJobInfo: React.Dispatch<React.SetStateAction<Job>>;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export const JobContext = createContext({} as IJobContext)

export const JobProvider = ({ children }: IJobContextProvider) => {
  const [jobInfo, setJobInfo] = useState<Job>({} as Job);
  const [file, setFile] = useState<File | null>(null)

  return (
    <JobContext.Provider value={{ setJobInfo, jobInfo, file, setFile }}>
      {children}
    </JobContext.Provider>
  )
}

export const useJobInfo = () => useContext(JobContext);