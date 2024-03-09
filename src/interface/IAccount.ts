import { Role } from './IRole';

export interface IAccount {
  id: number;
  name: string;
  password: string;
  email: string;
  role: Role;
  createdAt: Date;
}

export namespace IAccount {
  export interface ILogin extends Pick<IAccount, 'email' | 'password'> {}

  export interface ISignup extends Pick<IAccount, 'email' | 'password' | 'name' | 'role'> {}

  export interface IAccountProfileDetail extends IAccount {}

  export interface ILoggedInUserList
    extends Pick<IAccount, 'id' | 'name' | 'email' | 'createdAt'> {}
}
