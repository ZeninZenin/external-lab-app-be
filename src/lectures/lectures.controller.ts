import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { Roles } from 'src/auth';
import {
  CreateLectureDto,
  UpdateLectureDto,
} from 'src/lectures/lectures.types';

@Controller('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}

  @Get()
  async findAll() {
    return this.lecturesService.find();
  }

  @Post()
  @Roles('admin')
  async create(@Body() createLectureDto: CreateLectureDto) {
    return this.lecturesService.create(createLectureDto);
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.lecturesService.findOne({ _id: id });
  }

  @Put(':id')
  @Roles('admin', 'trainer')
  update(@Param('id') id: string, @Body() body: UpdateLectureDto) {
    return this.lecturesService.findOneAndUpdate(
      { _id: id },
      {
        ...body,
      },
    );
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: string) {
    return this.lecturesService.delete(id);
  }
}
