import { SearchService } from './search.service';
export declare class SearchController {
    private searchService;
    constructor(searchService: SearchService);
    globalSearch(query: string): Promise<{
        posts: ({
            user: {
                id: string;
                username: string;
                name: string;
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
        })[];
        cells: {
            id: string;
            createdAt: Date;
            name: string;
            title: string;
            description: string | null;
            createdById: string;
        }[];
        users: {
            id: string;
            username: string;
            name: string;
        }[];
    }>;
}
