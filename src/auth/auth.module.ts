import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppConfigService } from '../../config/configuration';
import { DbModule } from '../db';
import { UsersModule } from '../users';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  providers: [AppConfigService, Logger, AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    UsersModule,
    DbModule,
    JwtModule.register({
      signOptions: { expiresIn: '24h' },
      secret: process.env.JWT_SECRET,
    }),
  ],
})
export class AuthModule {}
