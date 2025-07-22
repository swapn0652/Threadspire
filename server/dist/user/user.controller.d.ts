import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    updateProfile(req: any, dto: UpdateUserDto): Promise<{
        email: string;
        name: string;
        id: string;
        spark: number;
    }>;
}
