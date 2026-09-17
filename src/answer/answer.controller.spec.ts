import { Test, TestingModule } from '@nestjs/testing';
import { AnswerController } from './answer.controller.js';
import { AnswerService } from './answer.service.js';

describe('AnswerController', () => {
  let controller: AnswerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerController],
      providers: [AnswerService],
    }).compile();

    controller = module.get<AnswerController>(AnswerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
