export interface LoginRequestType {
  username: string;
  password: string;
}

export interface TokenDataType {
  name: string;
  userId: string;
  phone_number: number;
  token: string;
  username: string;
}

export interface LoginResponseType {
  tokenData: TokenDataType;
}

export interface RefreshTokenRequestType {
  userId: string;
}

export interface RefreshTokenResponseType {
  token: string;
}
