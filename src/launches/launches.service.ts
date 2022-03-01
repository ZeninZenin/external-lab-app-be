import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Launch } from './launches.schemas';

@Injectable()
export class LaunchesService {
  constructor(@InjectModel(Launch.name) private launchModel: Model<Launch>) {}

  findActual = () => this.launchModel.findOne({ isActual: true });
}
