import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('github')
  async authViaGithub(@Body('code') code: string) {
    const accessToken = await this.authService.validateGithubUser(code);
    return await this.authService.loginViaGithub(accessToken);
  }
}
