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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RolesService = class RolesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createRole(dto) {
        const existing = await this.prisma.role.findUnique({
            where: { name: dto.name.toUpperCase() },
        });
        if (existing)
            throw new common_1.ConflictException('El rol ya existe');
        return this.prisma.role.create({
            data: {
                name: dto.name.toUpperCase(),
                permissions: {
                    create: dto.permissionIds?.map((id) => ({ permissionId: id })) || [],
                },
            },
            include: { permissions: { include: { permission: true } } },
        });
    }
    async createPermission(name) {
        const formattedName = name.toUpperCase();
        const existing = await this.prisma.permission.findUnique({
            where: { name: formattedName },
        });
        if (existing)
            throw new common_1.ConflictException('El permiso ya existe');
        return this.prisma.permission.create({ data: { name: formattedName } });
    }
    async assignPermissionToRole(roleId, permissionId) {
        const roleExists = await this.prisma.role.findUnique({
            where: { id: roleId },
        });
        if (!roleExists) {
            throw new common_1.NotFoundException('El rol especificado no existe.');
        }
        const permissionExists = await this.prisma.permission.findUnique({
            where: { id: permissionId },
        });
        if (!permissionExists) {
            throw new common_1.NotFoundException('El permiso especificado no existe.');
        }
        const alreadyHasPermission = await this.prisma.rolePermission.findUnique({
            where: {
                roleId_permissionId: { roleId, permissionId },
            },
        });
        if (alreadyHasPermission) {
            throw new common_1.ConflictException('Este rol ya tiene asignado este permiso.');
        }
        return this.prisma.rolePermission.create({
            data: { roleId, permissionId },
        });
    }
    async findAllRoles() {
        return this.prisma.role.findMany({
            include: { permissions: { include: { permission: true } } },
        });
    }
    async getRole(roleId) {
        return this.prisma.role.findUnique({
            where: {
                id: roleId,
            },
            include: { permissions: { include: { permission: true } } },
        });
    }
    async removeRole(roleId) {
        try {
            return await this.prisma.role.delete({
                where: {
                    id: roleId,
                },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException('El role no existe.');
            }
            throw error;
        }
    }
    async updateRole(id, updateRoleDto) {
        const { name, permissionIds } = updateRoleDto;
        const existingRole = await this.prisma.role.findUnique({ where: { id } });
        if (!existingRole) {
            throw new common_1.NotFoundException(`El rol con ID ${id} no existe`);
        }
        if (name && name !== existingRole.name) {
            const nameTaken = await this.prisma.role.findUnique({ where: { name } });
            if (nameTaken) {
                throw new common_1.ConflictException(`El nombre de rol '${name}' ya está en uso`);
            }
        }
        return this.prisma.$transaction(async (tx) => {
            if (permissionIds !== undefined) {
                await tx.rolePermission.deleteMany({
                    where: { roleId: id },
                });
                if (permissionIds.length > 0) {
                    await tx.rolePermission.createMany({
                        data: permissionIds.map((permissionId) => ({
                            roleId: id,
                            permissionId: permissionId,
                        })),
                    });
                }
            }
            return tx.role.update({
                where: { id },
                data: {
                    ...(name && { name }),
                },
                include: {
                    permissions: true,
                },
            });
        });
    }
    async findAllPaginate(query) {
        const { page, limit, search } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }
        const [roles, totalItems] = await this.prisma.$transaction([
            this.prisma.role.findMany({
                where,
                skip,
                take: limit,
                orderBy: { name: 'asc' },
                select: {
                    id: true,
                    name: true,
                },
            }),
            this.prisma.role.count({ where }),
        ]);
        return {
            data: roles,
            meta: {
                totalItems,
                itemCount: roles.length,
                itemsPerPage: limit,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page,
            },
        };
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RolesService);
//# sourceMappingURL=roles.service.js.map