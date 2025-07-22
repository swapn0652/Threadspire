import { FeedService } from './feed.service';
export declare class FeedController {
    private feedService;
    constructor(feedService: FeedService);
    getUserFeed(req: any): Promise<({
        user: {
            name: string;
            username: string;
            id: string;
        };
        cell: {
            name: string;
            id: string;
            title: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        cellId: string;
        content: string;
        upvotes: number;
        downvotes: number;
    })[]>;
}
