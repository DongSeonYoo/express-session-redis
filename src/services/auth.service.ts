import { Service } from 'typedi';
import { Prisma } from '../database/prisma.database';
import { IAccount } from '../interface/IAccount';
import { BadRequestException } from '../utils/modules/custom-error.module';
import { SessionData } from 'express-session';
import { RedisService } from '../database/redis.database';

@Service()
export class AuthService {
  constructor(private readonly prisma: Prisma, private readonly redisService: RedisService) {}

  async verifyAccount({ email, password }: IAccount.ILogin): Promise<{ userId: number }> {
    const result = await this.prisma.accountTb.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        password: true,
        id: true,
      },
    });

    if (!result) {
      throw new BadRequestException('아이디가 존재하지 않습니다 (이메일)');
    }

    if (password !== result.password) {
      throw new BadRequestException('아이디가 존재하지 않습니다 (비밀번호)');
    }

    return {
      userId: result.id,
    };
  }

  async registerAccount({ email, name, password }: IAccount.ISignup) {
    const duplicateCheck = await this.prisma.accountTb.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (duplicateCheck) {
      throw new BadRequestException('중복된 이메일이 존재함미다');
    }

    return await this.prisma.accountTb.create({
      data: {
        email,
        name,
        password,
      },
      select: {
        id: true,
      },
    });
  }

  async getLoggedInUserListInRedis(): Promise<Pick<SessionData, 'userId' | 'loggedInAt'>[]> {
    const getLoggedInUsers = await this.redisService.client.keys('session:*');
    const sessionDataList: Pick<SessionData, 'userId' | 'loggedInAt'>[] = await Promise.all(
      getLoggedInUsers
        .map((key) => this.redisService.client.get(key))
        .map((data) => data.then((elemenet) => elemenet && JSON.parse(elemenet))),
    );
    // const tojsonData: SessionData[] = sessionDataList.map((data) => {
    //   if (data) {
    //     return JSON.parse(data);
    //   }
    // });
    // console.log(sessionDataList);

    return sessionDataList;
  }

  async checkExistLoggedInUserInRedis(sessionId: string) {
    const result = await this.redisService.client.get(sessionId);

    if (!result) {
      throw new BadRequestException('이미 로그인되어있음');
    }

    return result;
  }
}
