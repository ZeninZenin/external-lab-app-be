import { Module } from '@nestjs/common';
import { AppConfigService } from './configuration.service';

@Module({
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class ConfigurationModule {}
