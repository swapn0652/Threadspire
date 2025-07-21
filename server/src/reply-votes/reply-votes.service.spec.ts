import { Test, TestingModule } from '@nestjs/testing';
import { ReplyVotesService } from './reply-votes.service';

describe('ReplyVotesService', () => {
  let service: ReplyVotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplyVotesService],
    }).compile();

    service = module.get<ReplyVotesService>(ReplyVotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
