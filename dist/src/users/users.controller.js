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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const assign_role_dto_1 = require("./dto/assign-role.dto");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const permissions_guard_1 = require("../common/guards/permissions.guard");
const permissions_decorator_1 = require("../common/decorators/permissions.decorator");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_response_dto_1 = require("./dto/user-response.dto");
const serialize_interceptor_1 = require("../common/interceptors/serialize.interceptor");
const user_query_dto_1 = require("./dto/user-query.dto");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async createUser(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async getAllUsers() {
        return this.usersService.findAll();
    }
    async getUserProfile(id) {
        return this.usersService.findOneWithPermissions(id);
    }
    async assignRole(userId, assignRoleDto) {
        return this.usersService.assignRole(userId, assignRoleDto.roleId);
    }
    async removeRole(userId, roleId) {
        return this.usersService.removeRole(userId, roleId);
    }
    async removeUser(userId) {
        return this.usersService.removeUser(userId);
    }
    async updateUser(userId, updateUserDto) {
        return this.usersService.updateUser(userId, updateUserDto);
    }
    findAll(query) {
        return this.usersService.findAllPaginate(query);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('CREATE_USER'),
    (0, serialize_interceptor_1.Serialize)(user_response_dto_1.UserResponseDto),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new user',
        description: 'Creates a new user with the specified details.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User created successfully.',
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
        description: 'Conflict.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('READ_USER'),
    (0, serialize_interceptor_1.Serialize)(user_response_dto_1.UserResponseDto),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all users',
        description: 'Retrieves a list of all users along with their associated roles.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Users retrieved successfully.',
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
        status: 500,
        description: 'Internal server error.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)(':id/profile'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('READ_USER_PROFILE'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get user profile with permissions',
        description: 'Retrieves the profile of a user along with their associated permissions.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User profile retrieved successfully.',
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
        description: 'User not found.',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.Post)(':id/roles'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('ASSIGN_ROLE'),
    (0, swagger_1.ApiOperation)({
        summary: 'Assign a role to a user.',
        description: 'Assigns a role to a user.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Role assigned successfully.',
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
        description: 'User not found.',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, assign_role_dto_1.AssignRoleDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "assignRole", null);
__decorate([
    (0, common_1.Delete)(':userId/roles/:roleId'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('REMOVE_ROLE'),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove a role from a user.',
        description: 'Removes a role from a user. This operation requires both the user ID and the role ID.',
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
        description: 'User not found.',
    }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('roleId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeRole", null);
__decorate([
    (0, common_1.Delete)(':id/'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('DELETE_USER'),
    (0, serialize_interceptor_1.Serialize)(user_response_dto_1.UserResponseDto),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove a user.',
        description: 'Removes a user from the system.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User removed successfully.',
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
        description: 'User not found.',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeUser", null);
__decorate([
    (0, common_1.Patch)(':id/'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('UPDATE_USER'),
    (0, serialize_interceptor_1.Serialize)(user_response_dto_1.UserResponseDto),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a user.',
        description: 'Updates a user with the specified details.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User updated successfully.',
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
        description: 'User not found.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict.',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Version)('2'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)('READ_USER'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all users paginated',
        description: 'Retrieves a list of all users paginated along with their associated roles.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Users retrieved successfully.',
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
        status: 500,
        description: 'Internal server error.',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_query_dto_1.UserQueryDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map