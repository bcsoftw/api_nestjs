"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const roles_service_1 = require("./roles.service");
const create_role_dto_1 = require("./dto/create-role.dto");
const create_permission_dto_1 = require("./dto/create-permission.dto");
const assign_permission_dto_1 = require("./dto/assign-permission.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const permissions_guard_1 = require("../common/guards/permissions.guard");
const permissions_decorator_1 = require("../common/decorators/permissions.decorator");
const update_role_dto_1 = require("./dto/update-role.dto");
const role_query_dto_1 = require("./dto/role-query.dto");
let RolesController = class RolesController {
    rolesService;
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    async createRole(dto) {
        return this.rolesService.createRole(dto);
    }
    async createPermission(createPermissionDto) {
        return this.rolesService.createPermission(createPermissionDto.name);
    }
    async assignPermission(roleId, assignPermissionDto) {
        return this.rolesService.assignPermissionToRole(roleId, assignPermissionDto.permissionId);
    }
    async getRoles() {
        return this.rolesService.findAllRoles();
    }
    findAllPaginate(query) {
        return this.rolesService.findAllPaginate(query);
    }
    async getRole(roleId) {
        return this.rolesService.getRole(roleId);
    }
    async removeRole(roleId) {
        return this.rolesService.removeRole(roleId);
    }
    async updateRole(roleId, updateRoleDto) {
        return this.rolesService.updateRole(roleId, updateRoleDto);
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('CREATE_ROLE'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new role',
        description: 'Creates a new role with the specified name and optional permissions.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Role created successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Role already existed.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "createRole", null);
__decorate([
    (0, common_1.Post)('permissions'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('CREATE_PERMISSION'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new permission',
        description: 'Creates a new permission with the specified name.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Permission created successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Permission already existed.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permission_dto_1.CreatePermissionDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "createPermission", null);
__decorate([
    (0, common_1.Post)(':roleId/permissions'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('ASSIGN_PERMISSION'),
    (0, swagger_1.ApiOperation)({
        summary: 'Assign a permission to a role',
        description: 'Assigns a permission to a role based on the provided role ID and permission ID.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Permission assigned to role successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Permission already assigned to role.',
    }),
    __param(0, (0, common_1.Param)('roleId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, assign_permission_dto_1.AssignPermissionDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "assignPermission", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('READ_ROLE'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all roles',
        description: 'Returns a list of all roles registered in the system.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of roles successfully retrieved.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getRoles", null);
__decorate([
    (0, common_1.Version)('2'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('READ_ROLE'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all roles paginated',
        description: 'Returns a list paginated of all roles paginated in the system.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of roles paginated successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden.',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_query_dto_1.RoleQueryDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "findAllPaginate", null);
__decorate([
    (0, common_1.Get)(':id/'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('READ_ROLE'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a role.',
        description: 'Get a role from the system.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Role successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Role not found.',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getRole", null);
__decorate([
    (0, common_1.Delete)(':id/'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('DELETE_ROLE'),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove a role.',
        description: 'Removes a role from the system.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Role removed successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Role not found.',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "removeRole", null);
__decorate([
    (0, common_1.Patch)(':id/'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('UPDATE_ROLE'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a role.',
        description: 'Update a role in the system.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Role successfully updated.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Role not found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict.',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "updateRole", null);
exports.RolesController = RolesController = __decorate([
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map