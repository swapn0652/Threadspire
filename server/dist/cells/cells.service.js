"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CellsService = class CellsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCell(userId, data) {
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
        });
    }
    async joinCells(cellIds, userId) {
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
            throw new common_1.ConflictException('Already a member of all selected cells.');
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
    async getCellByName(name) {
        const cell = await this.prisma.cell.findUnique({
            where: { name },
            include: {
                members: true,
                posts: true,
                moderators: true,
            }
        });
        if (!cell)
            throw new common_1.NotFoundException('Cell not found!');
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
        };
    }
    async leaveCell(cellId, userId) {
        const existing = await this.prisma.cellMembership.findUnique({
            where: { userId_cellId: { userId, cellId } }
        });
        if (!existing)
            throw new common_1.NotFoundException('You\'re not a member of this cell!');
        await this.prisma.cellMembership.delete({
            where: { userId_cellId: { userId, cellId } }
        });
        return {
            message: "Cell left successfully!"
        };
    }
    async addModerator(cellId, currentUserId, newModeratorId) {
        const isMod = await this.prisma.cellModerator.findUnique({
            where: { userId_cellId: { userId: currentUserId, cellId } }
        });
        if (!isMod)
            throw new common_1.ForbiddenException('Only moderators can add new moderators');
        const user = await this.prisma.user.findUnique({ where: { id: newModeratorId } });
        if (!user)
            throw new common_1.NotFoundException('User to promote not found');
        await this.prisma.cellModerator.create({
            data: {
                userId: newModeratorId,
                cellId,
            }
        });
        return {
            message: 'Moderator added successfully!'
        };
    }
    async updateCell(cellId, userId, data) {
        const isMod = await this.prisma.cellModerator.findUnique({
            where: { userId_cellId: { userId, cellId } }
        });
        if (!isMod)
            throw new common_1.ForbiddenException('Only moderators can update the cell');
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
    async getJoinedCells(userId) {
        return this.prisma.cell.findMany({
            where: {
                members: {
                    some: { userId },
                },
            },
            select: {
                id: true,
            },
        });
    }
};
exports.CellsService = CellsService;
exports.CellsService = CellsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CellsService);
//# sourceMappingURL=cells.service.js.map