import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Environment } from '../types';
import { UsersService } from '../users/users.service';

const environment = process.env.NODE_ENV as Environment;

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('github')
  async authViaGithub(@Body('code') code: string) {
    if (environment === 'production') {
      const accessToken = await this.authService.validateGithubUser(code);
      return await this.authService.loginViaGithub(accessToken);
    }

    if (environment === 'development') {
      const user = await this.usersService.findOne({ login: code });
      return this.authService.sign(user);
    }
  }
}
