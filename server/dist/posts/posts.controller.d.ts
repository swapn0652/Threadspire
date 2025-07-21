import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsService);
    createPost(req: any, dto: CreatePostDto): Promise<{
        id: string;
        content: string;
        createdAt: Date;
        userId: string;
        cellId: string;
    }>;
    getPostById(postId: string): Promise<{
        id: string;
        content: string;
        upvotes: number;
        downvotes: number;
        createdAt: Date;
        userId: string;
        updatedAt: Date;
        cellId: string;
    }>;
    deletePost(req: any, postId: string): Promise<{
        message: string;
    }>;
}
