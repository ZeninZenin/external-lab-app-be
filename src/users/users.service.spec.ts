import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AppConfigService } from '../../config/configuration';
import { DbModule } from '../db';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfigService, UsersService],
      imports: [DbModule],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
