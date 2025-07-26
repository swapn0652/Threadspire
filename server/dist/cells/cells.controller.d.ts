import { CellsService } from './cells.service';
import { CreateCellDto } from './dto/create-cell.dto';
import { AddModeratorDto } from './dto/add-moderator.dto';
import { EditCellDto } from './dto/edit-cell.dto';
import { PostsService } from 'src/posts/posts.service';
import { JoinCellsDto } from './dto/join-cells.dto';
export declare class CellsController {
    private cellsService;
    private postsService;
    constructor(cellsService: CellsService, postsService: PostsService);
    create(req: any, dto: CreateCellDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        title: string;
        description: string | null;
        createdById: string;
    }>;
    getAllCells(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        title: string;
        description: string | null;
        createdById: string;
    }[]>;
    joinCell(body: JoinCellsDto, req: any): Promise<{
        message: string;
    }>;
    getJoinedCells(req: any): Promise<{
        id: string;
    }[]>;
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
            userId: string;
            joinedAt: Date;
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
        name: string;
        id: string;
        createdAt: Date;
        title: string;
        description: string | null;
    }>;
    getPostsInCell(cellId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        cellId: string;
        content: string;
        upvotes: number;
        downvotes: number;
    }[]>;
}
