import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Delete,
  Patch,
  Query,
  Version,
} from '@nestjs/common'; 

import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { AssignPermissionDto } from './dto/assign-permission.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { RequirePermissions } from '../common/decorators/permissions.decorator';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleQueryDto } from './dto/role-query.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('CREATE_ROLE')
  @ApiOperation({
    summary: 'Create a new role',
    description:
      'Creates a new role with the specified name and optional permissions.',
  })
  @ApiResponse({
    status: 201,
    description: 'Role created successfully.',
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
    description: 'Role already existed.',
  })
  async createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @Post('permissions')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('CREATE_PERMISSION')
  @ApiOperation({
    summary: 'Create a new permission',
    description: 'Creates a new permission with the specified name.',
  })
  @ApiResponse({
    status: 201,
    description: 'Permission created successfully.',
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
    description: 'Permission already existed.',
  })
  async createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.rolesService.createPermission(createPermissionDto.name);
  }

  @Post(':roleId/permissions')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('ASSIGN_PERMISSION')
  @ApiOperation({
    summary: 'Assign a permission to a role',
    description:
      'Assigns a permission to a role based on the provided role ID and permission ID.',
  })
  @ApiResponse({
    status: 201,
    description: 'Permission assigned to role successfully.',
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
    description: 'Permission already assigned to role.',
  })
  async assignPermission(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() assignPermissionDto: AssignPermissionDto,
  ) {
    return this.rolesService.assignPermissionToRole(
      roleId,
      assignPermissionDto.permissionId,
    );
  }

  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('READ_ROLE')
  @ApiOperation({
    summary: 'Get all roles',
    description: 'Returns a list of all roles registered in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of roles successfully retrieved.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  async getRoles() {
    return this.rolesService.findAllRoles();
  }

  @Version('2')
  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('READ_ROLE')
  @ApiOperation({
    summary: 'Get all roles paginated',
    description: 'Returns a list paginated of all roles paginated in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of roles paginated successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  findAllPaginate(@Query() query: RoleQueryDto) {
    return this.rolesService.findAllPaginate(query);
  }

  @Get(':id/')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('READ_ROLE')
  @ApiOperation({
    summary: 'Get a role.',
    description: 'Get a role from the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'Role successfully.',
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
    description: 'Role not found.',
  })
  async getRole(@Param('id', ParseIntPipe) roleId: number) {
    return this.rolesService.getRole(roleId);
  }

  @Delete(':id/')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('DELETE_ROLE')
  @ApiOperation({
    summary: 'Remove a role.',
    description: 'Removes a role from the system.',
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
    description: 'Role not found.',
  })
  async removeRole(@Param('id', ParseIntPipe) roleId: number) {
    return this.rolesService.removeRole(roleId);
  }

  @Patch(':id/')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequirePermissions('UPDATE_ROLE')
  @ApiOperation({
    summary: 'Update a role.',
    description: 'Update a role in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'Role successfully updated.',
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
    description: 'Role not found.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict.',
  })
  async updateRole(
    @Param('id', ParseIntPipe) roleId: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.updateRole(roleId, updateRoleDto);
  }

}
