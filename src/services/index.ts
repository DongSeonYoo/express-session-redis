import Container from 'typedi';
import { AuthService } from './auth.service';
import { AccountService } from './account.service';

export const authService = Container.get(AuthService);
export const accountService = Container.get(AccountService);
