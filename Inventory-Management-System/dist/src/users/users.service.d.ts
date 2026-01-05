import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>>;
    findAll(): Promise<Omit<User, 'password'>[]>;
    deleteUser(userId: string, currentUserRole: string): Promise<void>;
    findOne(id: string): Promise<Omit<User, 'password'>>;
}
