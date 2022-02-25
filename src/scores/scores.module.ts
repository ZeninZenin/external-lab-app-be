import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './scores.schemas';
import { Task, TaskSchema } from '../tasks/task.schema';
import { User, UserSchema } from '../users/user.schema';

@Module({
  controllers: [ScoresController],
  providers: [ScoresService],
  exports: [ScoresService],
  imports: [
    MongooseModule.forFeature([
      { name: Score.name, schema: ScoreSchema },
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class ScoresModule {}
