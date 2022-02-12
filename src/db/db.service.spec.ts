import { Test, TestingModule } from '@nestjs/testing';
import { DbService } from './db.service';
import { AppConfigService } from '../../config/configuration';

describe('DbService', () => {
  let service: DbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbService, AppConfigService],
    }).compile();

    service = module.get<DbService>(DbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
