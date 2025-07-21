import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsService);
    createPost(req: any, dto: CreatePostDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        cellId: string;
        content: string;
    }>;
    getPostById(postId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        cellId: string;
        content: string;
        upvotes: number;
        downvotes: number;
    }>;
    deletePost(req: any, postId: string): Promise<{
        message: string;
    }>;
}
