import { Logger, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppConfigService } from '../../config/configuration';
import { DbModule } from '../db';
import { UsersModule } from '../users';

@Module({
  providers: [AppConfigService, Logger, AuthService],
  controllers: [AuthController],
  imports: [
    UsersModule,
    DbModule,
    JwtModule.register({
      signOptions: { expiresIn: '24h' },
      secret: '123',
    }),
  ],
})
export class AuthModule {}
