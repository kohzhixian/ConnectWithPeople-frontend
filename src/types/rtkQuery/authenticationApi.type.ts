export interface LoginRequestType {
  username: string;
  password: string;
}

export interface LoginResponseType {
  token: string;
  user: {
    id: number;
    username: string;
    // permissions: [];
  };
}
