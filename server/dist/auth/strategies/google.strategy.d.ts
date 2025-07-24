import { Strategy as GoogleStrategy, StrategyOptions, VerifyCallback } from 'passport-google-oauth20';
import { PrismaService } from 'src/prisma/prisma.service';
declare const GoogleOauthStrategy_base: new (...args: [options: import("passport-google-oauth20").StrategyOptionsWithRequest] | [options: StrategyOptions] | [options: StrategyOptions] | [options: import("passport-google-oauth20").StrategyOptionsWithRequest]) => GoogleStrategy & {
    validate(...args: any[]): unknown;
};
export declare class GoogleOauthStrategy extends GoogleOauthStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
