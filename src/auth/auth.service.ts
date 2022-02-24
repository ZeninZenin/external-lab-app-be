import {
  HttpException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { AppConfigService } from '../../config/configuration.service';
import { GithubUser } from './auth.types';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: AppConfigService,
    private readonly logger: Logger,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateGithubUser(code) {
    try {
      const { data } = await axios.post<string>(
        'https://github.com/login/oauth/access_token',
        {
          client_id: this.configService.get('githubOauthClientId'),
          client_secret: this.configService.get('githubOauthClientSecret'),
          code,
        },
      );

      const [firstKey, firstValue] = data.split('&')[0].split('=');

      if (firstKey === 'error') {
        throw new HttpException('Code is incorrect', 401);
      }

      if (firstKey === 'access_token') {
        return firstValue;
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error.response.status || error.status,
      );
    }
  }

  loginViaGithub = async (accessToken) => {
    try {
      const { data } = await axios.get<GithubUser>(
        'https://api.github.com/user',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      const user = await this.userService.findOneOrCreate({
        login: data.login,
        githubName: data.name,
      });

      if (user.isLocked) {
        return new UnauthorizedException();
      }

      return await this.jwtService.signAsync({ user: JSON.stringify(user) });
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  };
}
