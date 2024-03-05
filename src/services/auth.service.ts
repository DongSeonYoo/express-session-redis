import { Service } from 'typedi';
import { Prisma } from '../database/prisma.database';

@Service()
export class AuthService {
  constructor(private readonly prisma: Prisma) {}
}
