import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CellsService } from './cells.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCellDto } from './dto/create-cell.dto';
import { AddModeratorDto } from './dto/add-moderator.dto';
import { EditCellDto } from './dto/edit-cell.dto';
import { PostsService } from 'src/posts/posts.service';
import { JoinCellsDto } from './dto/join-cells.dto';

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
    @Post("join-cells")
    async joinCell(@Body() body: JoinCellsDto, @Req() req) {
        const userId = req.user.userId;
        return this.cellsService.joinCells(body.cellIds, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('joined-cells')
    getJoinedCells(@Req() req) {
        return this.cellsService.getJoinedCells(req.user.userId);
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
    getPostsInCell(
    @Param('id') cellId: string, 
    @Req() req: any,
    ) {
        const take = parseInt(req.query.take) || 10;
        const cursor = req.query.cursor || undefined;
        const sortBy = req.query.sortBy || 'top';

        return this.postsService.getPostsInCell(cellId, { take, cursor, sortBy });
    }


}
