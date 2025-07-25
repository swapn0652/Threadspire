import { Controller, Get, Req } from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Get()
  async getFeed(@Req() req) {
    const user = req.user as { userId?: string };
    return this.feedService.getFeed(user?.userId);
  }
}
