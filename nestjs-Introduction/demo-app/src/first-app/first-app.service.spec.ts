import { Test, TestingModule } from '@nestjs/testing';
import { FirstAppService } from './first-app.service';

describe('FirstAppService', () => {
  let service: FirstAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirstAppService],
    }).compile();

    service = module.get<FirstAppService>(FirstAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
