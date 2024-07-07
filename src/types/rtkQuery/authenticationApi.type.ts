export interface LoginRequestType {
  username: string;
  password: string;
}

interface tokenDataType {
  name: string;
  phone_number: number;
  token: string;
  username: string;
}

export interface LoginResponseType {
  tokenData: tokenDataType;
}
