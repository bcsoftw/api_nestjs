"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const userExists = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (userExists) {
            throw new common_1.ConflictException('El correo electrónico ya está registrado');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const rolesToConnect = data.roleIds && data.roleIds.length > 0 ? data.roleIds : [1];
        return this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                isActive: data.isActive ?? true,
                roles: {
                    create: rolesToConnect.map((id) => ({
                        roleId: id,
                    })),
                },
            },
            include: {
                roles: {
                    include: {
                        role: true,
                    },
                },
            },
        });
    }
    async findAll() {
        try {
            const users = await this.prisma.user.findMany({
                include: {
                    roles: {
                        include: {
                            role: true,
                        },
                    },
                },
            });
            if (!users || users.length === 0) {
                throw new common_1.NotFoundException('No se encontraron usuarios registrados.');
            }
            return users;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error inesperado al recuperar los usuarios.');
        }
    }
    async findOneWithPermissions(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                roles: {
                    include: {
                        role: {
                            include: {
                                permissions: {
                                    include: { permission: true },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!user)
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        const roles = user.roles.map((ur) => ur.role.name);
        const permissions = user.roles.flatMap((ur) => ur.role.permissions.map((rp) => rp.permission.name));
        const uniquePermissions = [...new Set(permissions)];
        return {
            id: user.id,
            email: user.email,
            roles,
            permissions: uniquePermissions,
        };
    }
    async assignRole(userId, roleId) {
        const userExists = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!userExists) {
            throw new common_1.NotFoundException('El usuario no existe.');
        }
        const roleExists = await this.prisma.role.findUnique({
            where: { id: roleId },
        });
        if (!roleExists) {
            throw new common_1.NotFoundException('El rol especificado no existe.');
        }
        const alreadyHasRole = await this.prisma.userRole.findUnique({
            where: {
                userId_roleId: { userId, roleId },
            },
        });
        if (alreadyHasRole) {
            throw new common_1.NotFoundException('El usuario ya tiene asignado este rol.');
        }
        return this.prisma.userRole.create({
            data: { userId, roleId },
        });
    }
    async removeRole(userId, roleId) {
        const roleAssignment = await this.prisma.userRole.findUnique({
            where: {
                userId_roleId: { userId, roleId },
            },
        });
        if (!roleAssignment) {
            throw new common_1.NotFoundException('El usuario no tiene asignado este rol.');
        }
        return this.prisma.userRole.delete({
            where: {
                userId_roleId: { userId, roleId },
            },
        });
    }
    async removeUser(userId) {
        try {
            return await this.prisma.user.delete({
                where: {
                    id: userId,
                },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException('El usuario no existe.');
            }
            throw error;
        }
    }
    async updateUser(id, updateUserDto) {
        const { email, password, roleIds, ...restOfData } = updateUserDto;
        const existingUser = await this.prisma.user.findUnique({ where: { id } });
        if (!existingUser) {
            throw new common_1.NotFoundException(`El usuario con ID ${id} no existe`);
        }
        if (email && email !== existingUser.email) {
            const emailTaken = await this.prisma.user.findUnique({
                where: { email },
            });
            if (emailTaken) {
                throw new common_1.ConflictException(`El email '${email}' ya está en uso`);
            }
        }
        const dataToUpdate = { ...restOfData };
        if (email)
            dataToUpdate.email = email;
        if (password) {
            dataToUpdate.password = await bcrypt.hash(password, 10);
        }
        return this.prisma.$transaction(async (tx) => {
            if (roleIds !== undefined) {
                await tx.userRole.deleteMany({
                    where: { userId: id },
                });
                if (roleIds.length > 0) {
                    await tx.userRole.createMany({
                        data: roleIds.map((roleId) => ({
                            userId: id,
                            roleId: roleId,
                        })),
                    });
                }
            }
            return tx.user.update({
                where: { id },
                data: dataToUpdate,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    isActive: true,
                    createdAt: true,
                    roles: {
                        select: {
                            role: true,
                        },
                    },
                },
            });
        });
    }
    async findAllPaginate(query) {
        const { page, limit, search, isActive, role } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (isActive !== undefined) {
            where.isActive = isActive;
        }
        if (role) {
            where.roles = {
                some: {
                    role: {
                        name: { equals: role, mode: 'insensitive' },
                    },
                },
            };
        }
        const [users, totalItems] = await this.prisma.$transaction([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    isActive: true,
                    createdAt: true,
                    roles: {
                        select: {
                            role: true,
                        },
                    },
                },
            }),
            this.prisma.user.count({ where }),
        ]);
        return {
            data: users,
            meta: {
                totalItems,
                itemCount: users.length,
                itemsPerPage: limit,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page,
            },
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map