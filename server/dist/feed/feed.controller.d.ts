import { FeedService } from './feed.service';
export declare class FeedController {
    private feedService;
    constructor(feedService: FeedService);
    getUserFeed(req: any): Promise<({
        user: {
            id: string;
            name: string;
            username: string;
        };
        cell: {
            id: string;
            name: string;
            title: string;
        };
    } & {
        id: string;
        content: string;
        upvotes: number;
        downvotes: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        cellId: string;
    })[]>;
}
