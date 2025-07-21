import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    updateProfile(userId: string, dto: UpdateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        spark: number;
    }>;
}
