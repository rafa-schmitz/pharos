import {CreatedBy, Location} from "./jobs";

export interface Job {
  id: number
  company: string
  createdAt: string
  updatedAt: string
  role: string
  position: string
  seniority: string
  contractType: string
  location: Location
  requirements: string[]
  description: string
  salaryCap: number
  createdBy: CreatedBy
}