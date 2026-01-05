import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(createUserDto: CreateUserDto): Promise<Omit<import("./entities/user.entity").User, "password">>;
    getProfile(req: any): {
        message: string;
        user: any;
    };
    adminDashboard(): {
        message: string;
    };
    managerDashboard(): {
        message: string;
    };
    staffDashboard(): {
        message: string;
    };
    getAllUsers(): Promise<Omit<import("./entities/user.entity").User, "password">[]>;
    getUserById(id: string): Promise<Omit<import("./entities/user.entity").User, "password">>;
    deleteUser(id: string, req: any): Promise<{
        message: string;
    }>;
}
