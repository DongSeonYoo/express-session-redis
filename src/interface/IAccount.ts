export interface IAccount {
  id: number;
  name: string;
  password: string;
  email: string;
  createdAt: Date;
}

export namespace IAccount {
  export interface ILogin extends Pick<IAccount, 'email' | 'password'> {}
}
