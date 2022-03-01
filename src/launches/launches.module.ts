import { Module } from '@nestjs/common';
import { LaunchesService } from './launches.service';
import { LaunchesController } from './launches.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Launch, LaunchSchema } from './launches.schemas';

@Module({
  controllers: [LaunchesController],
  providers: [LaunchesService],
  imports: [
    MongooseModule.forFeature([{ name: Launch.name, schema: LaunchSchema }]),
  ],
  exports: [LaunchesService],
})
export class LaunchesModule {}
