import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
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
    getUserById(userId: string): Promise<{
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
