import 'reflect-metadata';
import { Prisma } from '../../src/database/prisma.database';
import { ILoginRequest, ILoginResponse } from '../../src/interfaces/account/ILogin';
import { AuthService } from '../../src/services/auth.service';
import { BadRequestException } from '../../src/utils/modules/custom-error.module';

describe('authService', () => {
  let authService: AuthService;
  let prismaMock: Prisma;

  beforeEach(() => {
    prismaMock = new Prisma(); // Prisma 클래스의 mock 객체 생성
    authService = new AuthService(prismaMock);
  });

  it('login 메소드는 주어진 유효한 로그인 정보로 올바른 accessToken을 반환해야 함', async () => {
    // given
    const validLoginRequest: ILoginRequest = {
      loginId: 'user123',
      password: 'password123',
    };
    const loginResponse: ILoginResponse = {
      accessToken: 'accessToken입미당',
      userIdx: 123,
    };

    prismaMock.accountTb.findUnique = jest.fn().mockResolvedValue({
      id: 123,
      password: 'hashedPassword123',
    });

    // when
    const response = await authService.login(validLoginRequest);

    // then
    expect(response).toStrictEqual(loginResponse);
  });

  it('login 메소드는 주어진 유효하지 않은 로그인 정보에 대해 BadRequestException을 던져야 함', async () => {
    // given
    const invalidLoginDto: ILoginRequest = {
      loginId: 'invalidUser',
      password: 'invalidPassword',
    };

    prismaMock.accountTb.findUnique = jest.fn().mockResolvedValue(null);

    // when
    const result = authService.login(invalidLoginDto);

    // // then
    await expect(result).rejects.toBeInstanceOf(BadRequestException);
  });
});
