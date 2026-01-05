/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Req,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/constants/roles.enum';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
//public route 

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'User with this email already exists' })
  @ApiResponse({ status: 403, description: 'Only one SUPER_ADMIN can exist' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
 
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved' })
  getProfile(@Req() req) {
    return {
      message: 'User profile',
      user: req.user,
    };
  }

  // admin can get this only
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Roles(Role.ADMIN)
  @Get('admin-dashboard')
  @ApiOperation({ summary: 'Admin dashboard (ADMIN only)' })
  @ApiResponse({ status: 200, description: 'Admin dashboard accessed' })
  adminDashboard() {
    return {
      message: 'Welcome Admin Dashboard',
    };
  }

  // admin and manager can get this 
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Roles(Role.ADMIN, Role.MANAGER)
  @Get('manager-dashboard')
  @ApiOperation({ summary: 'Manager dashboard (ADMIN, MANAGER only)' })
  @ApiResponse({ status: 200, description: 'Manager dashboard accessed' })
  managerDashboard() {
    return {
      message: 'Welcome Manager Dashboard',
    };
  }

  //  ADMIN or MANAGER or STAFF
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  @Get('staff-dashboard')
  @ApiOperation({ summary: 'Staff dashboard (All roles)' })
  @ApiResponse({ status: 200, description: 'Staff dashboard accessed' })
  staffDashboard() {
    return {
      message: 'Welcome Staff Dashboard',
    };
  }

  // ✅ SUPER_ADMIN, ADMIN, MANAGER - Get all users
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.MANAGER)
  @Get('all')
  @ApiOperation({ summary: 'Get all users (SUPER_ADMIN, ADMIN, MANAGER only)' })
  @ApiResponse({ status: 200, description: 'List of all users' })
  getAllUsers() {
    return this.usersService.findAll();
  }

  // ✅ SUPER_ADMIN ONLY - Get user by ID
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Roles(Role.SUPER_ADMIN)
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID (SUPER_ADMIN only)' })
  @ApiParam({ name: 'id', type: String, description: 'User UUID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  // ✅ SUPER_ADMIN ONLY - Delete user (can delete ADMIN, MANAGER, STAFF)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Roles(Role.SUPER_ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user (SUPER_ADMIN only, cannot delete SUPER_ADMIN)' })
  @ApiParam({ name: 'id', type: String, description: 'User UUID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 400, description: 'SUPER_ADMIN cannot be deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(@Param('id', ParseUUIDPipe) id: string, @Req() req: any) {
    await this.usersService.deleteUser(id, req.user.role);
    return {
      message: 'User deleted successfully',
    };
  }
}
