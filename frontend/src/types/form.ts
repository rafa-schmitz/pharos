export interface SignUpFormInputs {
  username:string;
  name:string;
  email: string;
  password: string;
  isRecruiter:boolean;
};

export interface SignUpRequest {
  username:string;
  name:string;
  email: string;
  password: string;
  usertype:string;
}