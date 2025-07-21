import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { FeedService } from './feed.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('feed')
@UseGuards(AuthGuard('jwt'))
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Get()
  async getUserFeed(@Req() req) {
    const userId = req.user.userId;
    return this.feedService.getFeedForUser(userId);
  }
}
