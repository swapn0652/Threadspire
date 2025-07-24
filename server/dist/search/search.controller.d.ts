import { SearchService } from './search.service';
export declare class SearchController {
    private searchService;
    constructor(searchService: SearchService);
    globalSearch(query: string): Promise<{
        posts: ({
            user: {
                name: string;
                username: string | null;
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
        })[];
        cells: {
            name: string;
            id: string;
            createdAt: Date;
            title: string;
            description: string | null;
            createdById: string;
        }[];
        users: {
            name: string;
            username: string | null;
            id: string;
        }[];
    }>;
}
