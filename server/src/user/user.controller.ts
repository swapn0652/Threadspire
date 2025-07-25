import {
  Controller,
  Patch,
  Get,
  Query,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch('profile')
  async updateProfile(@Req() req, @Body() dto: UpdateUserDto) {
    const userId = req.user.userId;
    return this.userService.updateProfile(userId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Req() req) {
    return this.userService.getMe(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('posts')
  async getMyPosts(
    @Req() req,
    @Query('limit') limit?: string,
    @Query('cursor') cursor?: string,
  ) {
    return this.userService.getMyPosts(req.user.userId, Number(limit) || 10, cursor);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('replies')
  async getMyReplies(
    @Req() req,
    @Query('limit') limit?: string,
    @Query('cursor') cursor?: string,
  ) {
    return this.userService.getMyReplies(req.user.userId, Number(limit) || 10, cursor);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('upvoted')
  async getUpvotedPosts(
    @Req() req,
    @Query('limit') limit?: string,
    @Query('cursor') cursor?: string,
  ) {
    return this.userService.getUpvotedPosts(req.user.userId, Number(limit) || 10, cursor);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('downvoted')
  async getDownvotedPosts(
    @Req() req,
    @Query('limit') limit?: string,
    @Query('cursor') cursor?: string,
  ) {
    return this.userService.getDownvotedPosts(req.user.userId, Number(limit) || 10, cursor);
  }
}
