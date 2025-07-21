import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CellsService } from './cells.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCellDto } from './dto/create-cell.dto';
import { AddModeratorDto } from './dto/add-moderator.dto';
import { EditCellDto } from './dto/edit-cell.dto';
import { PostsService } from 'src/posts/posts.service';

@Controller('cells')
export class CellsController {
    constructor(private cellsService: CellsService, private postsService: PostsService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Req() req, @Body() dto: CreateCellDto) {
        const userId = req.user.userId;
        return this.cellsService.createCell(userId, dto);
    }

    @Get()
    getAllCells() {
        return this.cellsService.getAllCells();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(":id/join")
    async joinCell(@Param('id') cellId: string, @Req() req) {
        const userId = req.user.userId;
        return this.cellsService.joinCell(cellId, userId);
    }

    @Get(':name')
    getCellByName(@Param('name') name: string) {
        return this.cellsService.getCellByName(name);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(':id/leave')
    async leaveCell(@Param('id') cellId: string, @Req() req) {
        const userId = req.user.userId;
        return this.cellsService.leaveCell(cellId, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(':id/moderators')
    async addModerator(@Param('id') cellId: string, @Req() req, @Body() body: AddModeratorDto) {
        const currentUserId = req.user.userId;
        return this.cellsService.addModerator(cellId, currentUserId, body.newModeratorId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async updateCell(@Param('id') cellId: string, @Req() req, @Body() dto: EditCellDto) {
        const userId = req.user.userId;
        return this.cellsService.updateCell(cellId, userId, dto);
    }

    @Get('/:id/posts')
    getPostsInCell(@Param('id') cellId: string) {
        return this.postsService.getPostsInCell(cellId);
    }

}
