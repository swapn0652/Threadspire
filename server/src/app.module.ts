import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CellsModule } from './cells/cells.module';
import { PostsModule } from './posts/posts.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, CellsModule, PostsModule, VotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
