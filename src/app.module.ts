import { Logger, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import configuration from '../config/configuration.service';
import { AuthModule, RolesGuard, JwtAuthGuard } from './auth/';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationModule } from '../config/configuration.module';
import { DbService } from './db/db.service';
import { Environment } from './types';
import { ScoresModule } from './scores/scores.module';
import { LaunchesModule } from './launches/launches.module';
import { LecturesModule } from './lectures/lectures.module';

const environment = process.env.NODE_ENV as Environment;

const envFilePathMap: Record<Environment, ConfigModuleOptions['envFilePath']> =
  {
    production: '.env',
    debug: '',
    development: ['.env.development.local', '.env.development', '.env'],
  };

const providers: Provider[] = [
  AppService,
  Logger,
  { provide: APP_GUARD, useClass: JwtAuthGuard },
  { provide: APP_GUARD, useClass: RolesGuard },
];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFilePathMap[environment],
      load: [configuration],
    }),
    TasksModule,
    AuthModule,
    UsersModule,
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      useClass: DbService,
    }),
    ScoresModule,
    LaunchesModule,
    LecturesModule,
  ],
  controllers: [AppController],
  providers,
})
export class AppModule {}
