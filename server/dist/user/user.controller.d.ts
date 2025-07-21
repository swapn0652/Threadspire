import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    updateProfile(req: any, dto: UpdateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        spark: number;
    }>;
}
