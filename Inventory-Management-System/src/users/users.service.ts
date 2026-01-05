/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../common/constants/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const { email, password, name, role } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Prevent creating multiple SUPER_ADMIN users
    if (role === Role.SUPER_ADMIN) {
      const existingSuperAdmin = await this.userRepository.findOne({
        where: { role: Role.SUPER_ADMIN },
      });

      if (existingSuperAdmin) {
        throw new ForbiddenException(
          'Only one SUPER_ADMIN user can exist in the system',
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await this.userRepository.save(user);

    const { password: _, ...result } = savedUser;
    return result;
  }

  // ✅ GET ALL USERS (for SUPER_ADMIN only)
  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find({
      select: [
        'id',
        'name',
        'email',
        'role',
        'isActive',
        'createdAt',
        'updatedAt',
        'createdBy',
        'updatedBy',
      ],
      order: {
        createdAt: 'DESC',
      },
    });
    return users;
  }

  // ✅ DELETE USER (SUPER_ADMIN can delete ADMIN, MANAGER, STAFF)
  async deleteUser(userId: string, currentUserRole: string): Promise<void> {
    // Only SUPER_ADMIN can delete users
    if (currentUserRole !== Role.SUPER_ADMIN) {
      throw new ForbiddenException(
        'Only SUPER_ADMIN can delete users',
      );
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Prevent deleting SUPER_ADMIN
    if (user.role === Role.SUPER_ADMIN) {
      throw new BadRequestException(
        'SUPER_ADMIN user cannot be deleted',
      );
    }

    await this.userRepository.remove(user);
  }

  // ✅ GET USER BY ID
  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}

