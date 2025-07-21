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
exports.VotesController = void 0;
const common_1 = require("@nestjs/common");
const vote_dto_1 = require("./dto/vote.dto");
const votes_service_1 = require("./votes.service");
const passport_1 = require("@nestjs/passport");
let VotesController = class VotesController {
    votesService;
    constructor(votesService) {
        this.votesService = votesService;
    }
    vote(postId, req, dto) {
        return this.votesService.vote(postId, req.user.userId, dto);
    }
    removeVote(postId, req) {
        return this.votesService.removeVote(postId, req.user.userId);
    }
};
exports.VotesController = VotesController;
__decorate([
    (0, common_1.Post)(':postId'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, vote_dto_1.VoteDto]),
    __metadata("design:returntype", void 0)
], VotesController.prototype, "vote", null);
__decorate([
    (0, common_1.Delete)(':postId'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], VotesController.prototype, "removeVote", null);
exports.VotesController = VotesController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('votes'),
    __metadata("design:paramtypes", [votes_service_1.VotesService])
], VotesController);
//# sourceMappingURL=votes.controller.js.map