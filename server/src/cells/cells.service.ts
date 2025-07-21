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

    async joinCell(cellId: string, userId: string) {
        const cell = await this.prisma.cell.findUnique({ where: { id: cellId }});

        if(!cell)
            throw new NotFoundException("Cell not found!");

        const existing = await this.prisma.cellMembership.findUnique({
            where: { userId_cellId: { userId, cellId }}
        });

        if(existing)
            throw new ConflictException('Already a member');

        await this.prisma.cellMembership.create({
            data: {
                userId,
                cellId
            }
        })

        return {
            message: "Joined cell successfully!"
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
