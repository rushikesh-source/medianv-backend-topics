import { Test, TestingModule } from '@nestjs/testing';
import { BackendAppService } from './backend-app.service';

describe('BackendAppService', () => {
  let service: BackendAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackendAppService],
    }).compile();

    service = module.get<BackendAppService>(BackendAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
