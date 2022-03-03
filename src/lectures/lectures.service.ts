import { Injectable } from '@nestjs/common';
import { CreateLectureDto, UpdateLectureDto } from './lectures.types';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Lecture } from 'src/lectures/lectures.schema';

@Injectable()
export class LecturesService {
  constructor(
    @InjectModel(Lecture.name) private lectureModel: Model<Lecture>,
  ) {}

  create = async (record: CreateLectureDto) => {
    const newItem = new this.lectureModel(record);

    return newItem.save();
  };

  findOne = async (filterQuery: FilterQuery<Lecture>): Promise<Lecture> => {
    return this.lectureModel.findOne(filterQuery);
  };

  find = async (filterQuery?: FilterQuery<Lecture>): Promise<Lecture[]> => {
    return this.lectureModel.find(filterQuery);
  };

  findOneAndUpdate = async (
    filterQuery: FilterQuery<Lecture>,
    userDto: UpdateLectureDto,
  ): Promise<Lecture> => {
    return this.lectureModel.findOneAndUpdate(filterQuery, userDto, {
      new: true,
    });
  };

  delete = async (_id: string) => {
    return this.lectureModel.deleteOne({ _id });
  };
}
