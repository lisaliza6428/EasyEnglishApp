export interface SignUpModel {
  name: string;
  email: string;
  password: string;
}

export interface LoginModel {
  name: string;
  email: string;
  password: string;
}

export interface AuthDataModel {
  message: string;
  name: string;
  refreshToken: string;
  token: string;
  userId: string;
}

export interface ErrorModel {
  status?: number;
  statusText?: string;
}
