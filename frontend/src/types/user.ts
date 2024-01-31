export interface User {
  filter(arg0: (exp: { id: number }) => boolean): User
  id: number
  name: string
  lastName?: string
  email: string
  username: string
  languages?: string[]
  educations?: string[]
  skills?: Skills
  seniority?: string
  role?: string
  photo?: Photo
  usertype: string
  experience?: Experience[]
}

export interface Skills {
  tools: string[]
  programmingLanguages: string[]
}

export interface Photo {
  id: number
  filename: string
  contentType: string
  url: string
}

export interface Content {
  content: User[]
}

export interface QueryPararamsUser {
  queryParamName?:string,
  queryParamLastName?:string
}

export interface UserUpdate {
  name: string
  email: string;
  lastName?: string
  languages?: string[]
  educations?: string[]
  seniority?: string
  role?: string
}

export interface Experience {
  id: number
  position: string
  companyName: string
  startDate: Date
  endDate: Date
}

export interface ExperienceUpdate {
  position: string
  companyName: string
  startDate: Date
  endDate: Date
}


