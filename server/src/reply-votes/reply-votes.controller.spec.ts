import { Test, TestingModule } from '@nestjs/testing';
import { ReplyVotesController } from './reply-votes.controller';

describe('ReplyVotesController', () => {
  let controller: ReplyVotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReplyVotesController],
    }).compile();

    controller = module.get<ReplyVotesController>(ReplyVotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
