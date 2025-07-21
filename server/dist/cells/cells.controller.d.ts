import { CellsService } from './cells.service';
import { CreateCellDto } from './dto/create-cell.dto';
import { AddModeratorDto } from './dto/add-moderator.dto';
import { EditCellDto } from './dto/edit-cell.dto';
import { PostsService } from 'src/posts/posts.service';
export declare class CellsController {
    private cellsService;
    private postsService;
    constructor(cellsService: CellsService, postsService: PostsService);
    create(req: any, dto: CreateCellDto): Promise<{
        id: string;
        name: string;
        title: string;
        description: string | null;
        createdAt: Date;
        createdById: string;
    }>;
    getAllCells(): Promise<{
        id: string;
        name: string;
        title: string;
        description: string | null;
        createdAt: Date;
        createdById: string;
    }[]>;
    joinCell(cellId: string, req: any): Promise<{
        message: string;
    }>;
    getCellByName(name: string): Promise<{
        id: string;
        name: string;
        title: string;
        description: string | null;
        createdAt: Date;
        createdBy: string;
        membersCount: number;
        moderatorsCount: number;
        members: {
            id: string;
            joinedAt: Date;
            userId: string;
            cellId: string;
        }[];
        moderators: {
            id: string;
            createdAt: Date;
            userId: string;
            cellId: string;
        }[];
        postsCount: number;
    }>;
    leaveCell(cellId: string, req: any): Promise<{
        message: string;
    }>;
    addModerator(cellId: string, req: any, body: AddModeratorDto): Promise<{
        message: string;
    }>;
    updateCell(cellId: string, req: any, dto: EditCellDto): Promise<{
        id: string;
        name: string;
        title: string;
        description: string | null;
        createdAt: Date;
    }>;
    getPostsInCell(cellId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        cellId: string;
        content: string;
        upvotes: number;
        downvotes: number;
        updatedAt: Date;
    }[]>;
}
