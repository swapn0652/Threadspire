import { Module } from '@nestjs/common';
import { CellsService } from './cells.service';
import { CellsController } from './cells.controller';
import { PostsService } from 'src/posts/posts.service';

@Module({
  providers: [CellsService, PostsService],
  controllers: [CellsController]
})
export class CellsModule {}
