import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class Prisma extends PrismaClient {
  constructor() {
    super();
  }
}
