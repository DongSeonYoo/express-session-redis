import { Service } from 'typedi';
import { Prisma } from '../database/prisma.database';
import { IAccount } from '../interface/IAccount';

@Service()
export class AuthService {
  constructor(private readonly prisma: Prisma) {}

  async login({ loginId, password }: IAccount.ILogin) {}
}
