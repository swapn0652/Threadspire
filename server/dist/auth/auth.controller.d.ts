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
        id: string;
        email: string;
        username: string;
        name: string;
        spark: number;
        createdAt: Date;
    } | null>;
}
