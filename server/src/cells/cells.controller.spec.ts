import { Test, TestingModule } from '@nestjs/testing';
import { CellsController } from './cells.controller';

describe('CellsController', () => {
  let controller: CellsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CellsController],
    }).compile();

    controller = module.get<CellsController>(CellsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
