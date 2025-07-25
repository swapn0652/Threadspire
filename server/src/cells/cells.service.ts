import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CellsService {
    constructor(private prisma: PrismaService) {}

   async createCell(userId: string, data: { name: string; title: string; description?: string }) {
    return this.prisma.cell.create({
            data: {
            name: data.name,
            title: data.title,
            description: data.description,
            createdById: userId,
            members: {
                create: {
                userId: userId,
                },
            },
            moderators: {
                create: {
                userId: userId,
                },
            },
            },
            select: {
            id: true,
            name: true,
            title: true,
            description: true,
            createdAt: true,
            createdById: true,
            },
        });
    }


    async getAllCells() {
        return this.prisma.cell.findMany({
            select: {
                id: true,
                name: true,
                title: true,
                description: true,
                createdAt: true,
                createdById: true,
            },
            orderBy: {
                createdAt: 'desc',
            }
        })
    }

    async joinCells(cellIds: string[], userId: string) {
        const validCells = await this.prisma.cell.findMany({
        where: {
            id: { in: cellIds }
        },
        select: { id: true }
        });

        console.log("validCells: ", validCells);

        const validCellIds = validCells.map((cell) => cell.id);

        const existingMemberships = await this.prisma.cellMembership.findMany({
        where: {
            userId,
            cellId: { in: validCellIds }
        },
            select: { cellId: true }
        });

        const alreadyJoinedIds = new Set(existingMemberships.map((m) => m.cellId));

        const newCellIds = validCellIds.filter((id) => !alreadyJoinedIds.has(id));

        if (newCellIds.length === 0) {
            throw new ConflictException('Already a member of all selected cells.');
        }

        await this.prisma.cellMembership.createMany({
            data: newCellIds.map((cellId) => ({
                cellId,
                userId,
            })),
            skipDuplicates: true, 
        });

        return {
            message: `Joined ${newCellIds.length} cells successfully!`,
        };
    }

    async getCellByName(name: string) {
        const cell = await this.prisma.cell.findUnique({
            where: { name },
            include: {
                members: true,
                posts: true,
                moderators: true,
            }
        })

        if(!cell)
            throw new NotFoundException('Cell not found!');

        return {
            id: cell.id,
            name: cell.name,
            title: cell.title,
            description: cell.description,
            createdAt: cell.createdAt,
            createdBy: cell.createdById,
            membersCount: cell.members.length,
            moderatorsCount: cell.moderators.length,
            members: cell.members,
            moderators: cell.moderators,
            postsCount: cell.posts.length,
        }
    }

    async leaveCell(cellId: string, userId: string) {
        const existing = await this.prisma.cellMembership.findUnique({
            where: { userId_cellId: { userId, cellId }}
        });

        if(!existing) 
            throw new NotFoundException('You\'re not a member of this cell!');

        await this.prisma.cellMembership.delete({
            where: { userId_cellId: { userId, cellId }}
        });

        return {
            message: "Cell left successfully!"
        };
    }

    async addModerator(cellId: string, currentUserId: string, newModeratorId: string) {
        const isMod = await this.prisma.cellModerator.findUnique({
            where: { userId_cellId: { userId: currentUserId, cellId }}
        });

        if(!isMod)
            throw new ForbiddenException('Only moderators can add new moderators');

        const user = await this.prisma.user.findUnique({ where: { id: newModeratorId } });

        if(!user)
            throw new NotFoundException('User to promote not found');

        await this.prisma.cellModerator.create({
            data: {
                userId: newModeratorId,
                cellId,
            }
        })

        return {
            message: 'Moderator added successfully!'
        };
    }

    async updateCell(cellId: string, userId: string, data: {title?: string, description?: string }) {
        const isMod = await this.prisma.cellModerator.findUnique({
            where: { userId_cellId: { userId, cellId } }
        });

        if(!isMod)
            throw new ForbiddenException('Only moderators can update the cell');

        return this.prisma.cell.update({
            where: { id: cellId },
            data: {
                title: data.title,
                description: data.description
            },
            select: {
                id: true,
                name: true,
                title: true,
                description: true,
                createdAt: true,
            }
        });
    }
}
