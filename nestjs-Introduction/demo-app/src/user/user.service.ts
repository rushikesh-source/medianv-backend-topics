import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 🔹 Create/Register a new user
  async createUser(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { email, password, name, role } = createUserDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user entity
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save user to database
    const savedUser = await this.userRepository.save(user);

    // Exclude password from returned object
    const { password: _, ...result } = savedUser;
    return result;
  }

  // 🔹 Get all users
  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();
    // Exclude password for each user
    return users.map(({ password, ...rest }) => rest);
  }
}
