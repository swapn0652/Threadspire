import { Module } from '@nestjs/common';
import { CellsService } from './cells.service';
import { CellsController } from './cells.controller';

@Module({
  providers: [CellsService],
  controllers: [CellsController]
})
export class CellsModule {}
