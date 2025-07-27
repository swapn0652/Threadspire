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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellsController = void 0;
const common_1 = require("@nestjs/common");
const cells_service_1 = require("./cells.service");
const passport_1 = require("@nestjs/passport");
const create_cell_dto_1 = require("./dto/create-cell.dto");
const add_moderator_dto_1 = require("./dto/add-moderator.dto");
const edit_cell_dto_1 = require("./dto/edit-cell.dto");
const posts_service_1 = require("../posts/posts.service");
const join_cells_dto_1 = require("./dto/join-cells.dto");
let CellsController = class CellsController {
    cellsService;
    postsService;
    constructor(cellsService, postsService) {
        this.cellsService = cellsService;
        this.postsService = postsService;
    }
    async create(req, dto) {
        const userId = req.user.userId;
        return this.cellsService.createCell(userId, dto);
    }
    getAllCells() {
        return this.cellsService.getAllCells();
    }
    async joinCell(body, req) {
        const userId = req.user.userId;
        return this.cellsService.joinCells(body.cellIds, userId);
    }
    getJoinedCells(req) {
        return this.cellsService.getJoinedCells(req.user.userId);
    }
    getCellByName(name) {
        return this.cellsService.getCellByName(name);
    }
    async leaveCell(cellId, req) {
        const userId = req.user.userId;
        return this.cellsService.leaveCell(cellId, userId);
    }
    async addModerator(cellId, req, body) {
        const currentUserId = req.user.userId;
        return this.cellsService.addModerator(cellId, currentUserId, body.newModeratorId);
    }
    async updateCell(cellId, req, dto) {
        const userId = req.user.userId;
        return this.cellsService.updateCell(cellId, userId, dto);
    }
    getPostsInCell(cellId, req) {
        const take = parseInt(req.query.take) || 10;
        const cursor = req.query.cursor || undefined;
        const sortBy = req.query.sortBy || 'top';
        return this.postsService.getPostsInCell(cellId, { take, cursor, sortBy });
    }
};
exports.CellsController = CellsController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_cell_dto_1.CreateCellDto]),
    __metadata("design:returntype", Promise)
], CellsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CellsController.prototype, "getAllCells", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)("join-cells"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [join_cells_dto_1.JoinCellsDto, Object]),
    __metadata("design:returntype", Promise)
], CellsController.prototype, "joinCell", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('joined-cells'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CellsController.prototype, "getJoinedCells", null);
__decorate([
    (0, common_1.Get)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CellsController.prototype, "getCellByName", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(':id/leave'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CellsController.prototype, "leaveCell", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(':id/moderators'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, add_moderator_dto_1.AddModeratorDto]),
    __metadata("design:returntype", Promise)
], CellsController.prototype, "addModerator", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, edit_cell_dto_1.EditCellDto]),
    __metadata("design:returntype", Promise)
], CellsController.prototype, "updateCell", null);
__decorate([
    (0, common_1.Get)('/:id/posts'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CellsController.prototype, "getPostsInCell", null);
exports.CellsController = CellsController = __decorate([
    (0, common_1.Controller)('cells'),
    __metadata("design:paramtypes", [cells_service_1.CellsService, posts_service_1.PostsService])
], CellsController);
//# sourceMappingURL=cells.controller.js.map