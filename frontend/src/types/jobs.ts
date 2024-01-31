export interface Jobs {
  content: Content[]
  pageable: Pageable
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: Sort2
  first: boolean
  numberOfElements: number
  empty: boolean
}

export interface Content {
  id: number
  company: string
  createdAt: string
  updatedAt: string
  logo?: Logo
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

export interface Logo {
  id: number
  filename: string
  url: string
}

export interface Location {
  country: string
  state: string
  city: string
}

export interface CreatedBy {
  id: number
  name: string
  lastName: string
  email: string
  username: string
  languages: string[]
  educations: string[]
  skills: Skills
  seniority: string
  role: string
  photo: any
  experiences: Experience[];
  usertype: string
}

export interface Skills {
  tools: string[]
  programmingLanguages: string[]
}

export interface Experience {
  id: number;
  position: string;
  companyName: string;
  startDate: string;
  endDate: string;
};

export interface Pageable {
  sort: Sort
  offset: number
  pageSize: number
  pageNumber: number
  paged: boolean
  unpaged: boolean
}

export interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export interface Sort2 {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export type QueryParamsJobs = 'sortByCreatedAtDesc' | 'sortByCreatedAtAsc' | 'searchJobsByUserId';
export interface SearchJobsPayLoad {
  userId?: number;
  page: number
}