import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request, Response } from 'express';
export declare class AuthController {
    private authService;
    private prisma;
    constructor(authService: AuthService, prisma: PrismaService);
    signup(dto: SignUpDto): Promise<{
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
            spark: number;
        };
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: any;
            username: any;
            name: any;
            email: any;
            spark: any;
        };
    }>;
    getMe(req: Request): Promise<{
        email: string;
        name: string;
        username: string | null;
        id: string;
        spark: number;
        createdAt: Date;
        memberships: {
            cell: {
                name: string;
                id: string;
                title: string;
            };
        }[];
    } | null>;
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: Request, res: Response): Promise<void>;
    setUsername(body: {
        username: string;
    }, req: Request): Promise<{
        email: string;
        name: string;
        username: string | null;
        password: string | null;
        id: string;
        spark: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
