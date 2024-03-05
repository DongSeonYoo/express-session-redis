export interface IAccount {
  id: number;
  loginId: string;
  password: string;
  email: string;
  name: string;
  phoneNumber: string;
  profileImg: string;
  provider: string;
  createdAt: string;
}

export namespace IAccount {
  export interface ILogin extends Pick<IAccount, 'loginId' | 'password'> {}
}
