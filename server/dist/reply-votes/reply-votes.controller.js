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
exports.ReplyVotesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const reply_votes_service_1 = require("./reply-votes.service");
const vote_on_reply_dto_1 = require("./dto/vote-on-reply.dto");
let ReplyVotesController = class ReplyVotesController {
    replyVotesService;
    constructor(replyVotesService) {
        this.replyVotesService = replyVotesService;
    }
    voteOnReply(replyId, req, dto) {
        const userId = req.user.userId;
        return this.replyVotesService.voteOnReply(replyId, userId, dto);
    }
};
exports.ReplyVotesController = ReplyVotesController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(':replyId'),
    __param(0, (0, common_1.Param)('replyId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, vote_on_reply_dto_1.VoteOnReplyDto]),
    __metadata("design:returntype", void 0)
], ReplyVotesController.prototype, "voteOnReply", null);
exports.ReplyVotesController = ReplyVotesController = __decorate([
    (0, common_1.Controller)('reply-votes'),
    __metadata("design:paramtypes", [reply_votes_service_1.ReplyVotesService])
], ReplyVotesController);
//# sourceMappingURL=reply-votes.controller.js.map