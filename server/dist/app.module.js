"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("./prisma/prisma.module");
const user_module_1 = require("./user/user.module");
const cells_module_1 = require("./cells/cells.module");
const posts_module_1 = require("./posts/posts.module");
const votes_module_1 = require("./votes/votes.module");
const replies_module_1 = require("./replies/replies.module");
const reply_votes_module_1 = require("./reply-votes/reply-votes.module");
const feed_module_1 = require("./feed/feed.module");
const search_module_1 = require("./search/search.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, prisma_module_1.PrismaModule, user_module_1.UserModule, cells_module_1.CellsModule, posts_module_1.PostsModule, votes_module_1.VotesModule, replies_module_1.RepliesModule, reply_votes_module_1.ReplyVotesModule, feed_module_1.FeedModule, search_module_1.SearchModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map