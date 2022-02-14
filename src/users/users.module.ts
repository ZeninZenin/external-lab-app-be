import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AppConfigService } from '../../config/configuration';
import { DbModule } from '../db';

@Module({
  controllers: [UsersController],
  providers: [AppConfigService, UsersService],
  exports: [UsersService],
  imports: [DbModule],
})
export class UsersModule {}
