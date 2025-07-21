import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    createPost(@Req() req, @Body() dto: CreatePostDto) {
        const userId = req.user.userId;
        return this.postsService.createPost(userId, dto);
    }

    @Get(':id')
    getPostById(@Param('id') postId: string) {
        return this.postsService.getPostById(postId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    deletePost(@Req() req, @Param('id') postId: string) {
        const userId = req.user.userId;
        return this.postsService.deletePost(postId, userId);
    }

}
