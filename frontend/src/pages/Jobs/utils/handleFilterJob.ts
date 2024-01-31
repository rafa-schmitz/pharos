import { Content as Job } from '../../../types/jobs'


interface IProps {
  jobs: Job[],
  input:string,
  action:string
}

export const handleFilterJob = ({
  action,
  input,
  jobs
}:IProps) =>{
  switch (action) {
    case 'seniority':
      return jobs.filter(job => job.seniority.toLowerCase().includes(input.toLowerCase()))
    case 'position':
      return jobs.filter(job => job.position.toLowerCase().includes(input.toLowerCase()))
    case 'company':
      return jobs.filter(job => job.company.toLowerCase().includes(input.toLowerCase()))
    case 'contractType':
      return jobs.filter(job => job.contractType.toLowerCase().includes(input.toLowerCase()))
    default:
      return jobs
  }
}