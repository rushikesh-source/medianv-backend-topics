import { Test, TestingModule } from '@nestjs/testing';
import { FirstAppController } from './first-app.controller';

describe('FirstAppController', () => {
  let controller: FirstAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FirstAppController],
    }).compile();

    controller = module.get<FirstAppController>(FirstAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
