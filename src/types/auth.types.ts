export interface IAuthDataRequest {
  username: string;
  password: string;
  expiresInMins: number;
}

export interface IAuthDataResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}
