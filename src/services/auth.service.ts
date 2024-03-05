import { Service } from 'typedi';
import { Prisma } from '../database/prisma.database';
import { IAccount } from '../interface/IAccount';

@Service()
export class AuthService {
  constructor(private readonly prisma: Prisma) {}

  async login({ loginId, password }: IAccount.ILogin) {
    // 로그인 로직...

    // 해당하는 사용자의 인덱스 반환
    return 1;
  }
}
