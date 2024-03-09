import { Service } from 'typedi';
import { Prisma } from '../database/prisma.database';
import { IAccount } from '../interface/IAccount';
import { BadRequestException } from '../utils/modules/custom-error.module';

@Service()
export class AccountService {
  constructor(private readonly prisma: Prisma) {}

  async getAccountProfileDetail(userId: number): Promise<IAccount.IAccountProfileDetail> {
    const result = await this.prisma.accountTb.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!result) {
      throw new BadRequestException('해당하는 사용자가 존재하지 않습니다');
    }

    return {
      id: result.id,
      email: result.email,
      password: result.password,
      name: result.name,
      role: result.role,
      createdAt: result.createdAt,
    };
  }

  async getLoggedInUserInfo(userIds: number[]): Promise<IAccount.ILoggedInUserList[]> {
    const result = await this.prisma.accountTb.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return result;
  }
}
