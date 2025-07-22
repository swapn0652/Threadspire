import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
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
    getMe(req: any): Promise<{
        email: string;
        name: string;
        username: string;
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
}
