import { Test, TestingModule } from '@nestjs/testing';
import { BackendAppController } from './backend-app.controller';

describe('BackendAppController', () => {
  let controller: BackendAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackendAppController],
    }).compile();

    controller = module.get<BackendAppController>(BackendAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
