import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks';
import configuration from '../config/configuration';
import { AuthModule } from './auth/';
import { UsersModule } from './users';
import { DbModule } from './db';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      load: [configuration],
    }),
    TasksModule,
    AuthModule,
    UsersModule,
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
