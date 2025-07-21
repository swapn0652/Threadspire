import { PrismaService } from 'src/prisma/prisma.service';
export declare class CellsService {
    private prisma;
    constructor(prisma: PrismaService);
    createCell(userId: string, data: {
        name: string;
        title: string;
        description?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        title: string;
        description: string | null;
        createdById: string;
    }>;
    getAllCells(): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        title: string;
        description: string | null;
        createdById: string;
    }[]>;
    joinCell(cellId: string, userId: string): Promise<{
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
            userId: string;
            cellId: string;
            joinedAt: Date;
        }[];
        moderators: {
            id: string;
            createdAt: Date;
            userId: string;
            cellId: string;
        }[];
        postsCount: number;
    }>;
    leaveCell(cellId: string, userId: string): Promise<{
        message: string;
    }>;
    addModerator(cellId: string, currentUserId: string, newModeratorId: string): Promise<{
        message: string;
    }>;
    updateCell(cellId: string, userId: string, data: {
        title?: string;
        description?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        title: string;
        description: string | null;
    }>;
}
