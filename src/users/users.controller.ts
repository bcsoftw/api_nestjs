import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Patch,
  Query,
  Version
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { RequirePermissions } from '../common/decorators/permissions.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { UserQueryDto } from './dto/user-query.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('CREATE_USER')
  @Serialize(UserResponseDto)
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user with the specified details.',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict.',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('READ_USER')
  @Serialize(UserResponseDto)
  @ApiOperation({
    summary: 'Get all users',
    description:
      'Retrieves a list of all users along with their associated roles.',
  })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id/profile')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('READ_USER_PROFILE')
  @ApiOperation({
    summary: 'Get user profile with permissions',
    description:
      'Retrieves the profile of a user along with their associated permissions.',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async getUserProfile(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOneWithPermissions(id);
  }

  @Post(':id/roles')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('ASSIGN_ROLE')
  @ApiOperation({
    summary: 'Assign a role to a user.',
    description: 'Assigns a role to a user.',
  })
  @ApiResponse({
    status: 201,
    description: 'Role assigned successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async assignRole(
    @Param('id', ParseIntPipe) userId: number,
    @Body() assignRoleDto: AssignRoleDto,
  ) {
    return this.usersService.assignRole(userId, assignRoleDto.roleId);
  }

  @Delete(':userId/roles/:roleId')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('REMOVE_ROLE')
  @ApiOperation({
    summary: 'Remove a role from a user.',
    description:
      'Removes a role from a user. This operation requires both the user ID and the role ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Role removed successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async removeRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ) {
    return this.usersService.removeRole(userId, roleId);
  }

  @Delete(':id/')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('DELETE_USER')
  @Serialize(UserResponseDto)
  @ApiOperation({
    summary: 'Remove a user.',
    description: 'Removes a user from the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'User removed successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async removeUser(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.removeUser(userId);
  }

  @Patch(':id/')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('UPDATE_USER')
  @Serialize(UserResponseDto)
  @ApiOperation({
    summary: 'Update a user.',
    description: 'Updates a user with the specified details.',
  })
  @ApiResponse({
    status: 201,
    description: 'User updated successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict.',
  })
  async updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Version('2')
  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('READ_USER')
  @ApiOperation({
    summary: 'Get all users paginated',
    description:
      'Retrieves a list of all users paginated along with their associated roles.',
  })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  findAll(@Query() query: UserQueryDto) {
    return this.usersService.findAllPaginate(query);
  }
}
