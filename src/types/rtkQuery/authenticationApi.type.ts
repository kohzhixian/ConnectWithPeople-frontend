import { JwtPayload } from "jwt-decode";

export interface LoginRequestType {
  username: string;
  password: string;
}

export interface TokenDataType extends JwtPayload {
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
