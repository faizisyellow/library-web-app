export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  username: string;
}
