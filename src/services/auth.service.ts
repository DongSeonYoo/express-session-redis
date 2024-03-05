import { Service } from 'typedi';
import { Prisma } from '../database/prisma.database';
import { BadRequestException } from '../utils/modules/custom-error.module';

@Service()
export class AuthService {
  constructor(private readonly prisma: Prisma) {}
}
