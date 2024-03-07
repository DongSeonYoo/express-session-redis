import { Service } from 'typedi';
import { Prisma } from '../database/prisma.database';
import { IAccount } from '../interface/IAccount';
import { BadRequestException } from '../utils/modules/custom-error.module';
import { SessionData } from 'express-session';
import { RedisService } from '../database/redis.database';

@Service()
export class AuthService {
  constructor(private readonly prisma: Prisma, private readonly redisService: RedisService) {}

  async login({ email, password }: IAccount.ILogin): Promise<{ userId: number }> {
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

  async signup({ email, name, password }: IAccount.ISignup) {
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
}
