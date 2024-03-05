import Container from 'typedi';
import { AuthService } from './auth.service';

export const authService = Container.get(AuthService);
