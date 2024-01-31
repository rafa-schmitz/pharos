export interface AppliedJobs {
  userAppliedJobs: Job;
  appliedAt: Date;
}

export interface Location {
  country: string;
  state: string;
  city: string;
};

export interface Experience {
  id: number;
  position: string;
  companyName: string;
  startDate: string;
  endDate: string;
};

export interface Logo {
  id: number
  filename: string
  url: string
}

export interface User {
  id: number;
  name: string;
  lastName: string | null;
  email: string;
  password: string;
  username: string;
  languages: string[];
  educations: any[];
  skills: {
    tools: string[];
    programmingLanguages: string[];
  };
  seniority: string | null;
  role: string | null;
  photo: string | null;
  userinterface: string;
  experiences: Experience[];
  enabled: boolean;
  authorities: {
    authority: string;
  }[];
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  accountNonLocked: boolean;
};

export interface Job {
  id: number;
  company: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  position: string;
  seniority: string;
  contractType: string;
  location: Location;
  requirements: string[];
  description: string;
  salaryCap: number;
  logo?: Logo
  createdBy: User;
};