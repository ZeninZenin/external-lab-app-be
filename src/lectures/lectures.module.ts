import { Module } from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { LecturesController } from './lectures.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lecture, LectureSchema } from 'src/lectures/lectures.schema';

@Module({
  controllers: [LecturesController],
  providers: [LecturesService],
  imports: [
    MongooseModule.forFeature([{ name: Lecture.name, schema: LectureSchema }]),
  ],
})
export class LecturesModule {}
