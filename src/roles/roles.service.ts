import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleQueryDto } from './dto/role-query.dto';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async createRole(dto: CreateRoleDto) {
    const existing = await this.prisma.role.findUnique({
      where: { name: dto.name.toUpperCase() },
    });
    if (existing) throw new ConflictException('El rol ya existe');

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

  async createPermission(name: string) {
    const formattedName = name.toUpperCase();
    const existing = await this.prisma.permission.findUnique({
      where: { name: formattedName },
    });
    if (existing) throw new ConflictException('El permiso ya existe');

    return this.prisma.permission.create({ data: { name: formattedName } });
  }

  async assignPermissionToRole(roleId: number, permissionId: number) {
    // Validar que el rol exista
    const roleExists = await this.prisma.role.findUnique({
      where: { id: roleId },
    });
    if (!roleExists) {
      throw new NotFoundException('El rol especificado no existe.');
    }

    // Validar que el permiso exista
    const permissionExists = await this.prisma.permission.findUnique({
      where: { id: permissionId },
    });
    if (!permissionExists) {
      throw new NotFoundException('El permiso especificado no existe.');
    }

    // Validar que el rol no tenga ya este permiso asignado
    const alreadyHasPermission = await this.prisma.rolePermission.findUnique({
      where: {
        roleId_permissionId: { roleId, permissionId }, // Requiere llave compuesta en tu esquema de Prisma
      },
    });
    if (alreadyHasPermission) {
      throw new ConflictException('Este rol ya tiene asignado este permiso.');
    }

    // Crear la relación si todo es válido
    return this.prisma.rolePermission.create({
      data: { roleId, permissionId },
    });
  }

  async findAllRoles() {
    return this.prisma.role.findMany({
      include: { permissions: { include: { permission: true } } },
    });
  }

  async getRole(roleId: number) {
    return this.prisma.role.findUnique({
      where: {
        id: roleId,
      },
      include: { permissions: { include: { permission: true } } },
    });
  }

  // Remover un role
  async removeRole(roleId: number) {
    try {
      return await this.prisma.role.delete({
        where: {
          id: roleId,
        },
      });
    } catch (error: any) {
      // Prisma lanza un código de error 'P2025' cuando el registro a eliminar no existe

      if (error.code === 'P2025') {
        throw new NotFoundException('El role no existe.');
      }

      // Propagar cualquier otro error inesperado de la base de datos
      throw error;
    }
  }

  // Actualizar un role
  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    const { name, permissionIds } = updateRoleDto;

    // 1. Verificar si el rol existe
    const existingRole = await this.prisma.role.findUnique({ where: { id } });
    if (!existingRole) {
      throw new NotFoundException(`El rol con ID ${id} no existe`);
    }

    // 2. Si se va a cambiar el nombre, verificar que no esté duplicado
    if (name && name !== existingRole.name) {
      const nameTaken = await this.prisma.role.findUnique({ where: { name } });
      if (nameTaken) {
        throw new ConflictException(
          `El nombre de rol '${name}' ya está en uso`,
        );
      }
    }

    // 3. Ejecutar la actualización en una transacción de Prisma
    return this.prisma.$transaction(async (tx) => {
      // Si se enviaron permissionIds, actualizamos la tabla intermedia RolePermission
      if (permissionIds !== undefined) {
        // Eliminar los permisos actuales del rol
        await tx.rolePermission.deleteMany({
          where: { roleId: id },
        });

        // Insertar las nuevas relaciones de permisos
        if (permissionIds.length > 0) {
          await tx.rolePermission.createMany({
            data: permissionIds.map((permissionId) => ({
              roleId: id,
              permissionId: permissionId,
            })),
          });
        }
      }

      // Actualizar los datos nativos del Rol (como el nombre) y retornar el resultado
      return tx.role.update({
        where: { id },
        data: {
          ...(name && { name }),
        },
        include: {
          permissions: true, // Incluye los nuevos permisos en la respuesta
        },
      });
    });
  }

  async findAllPaginate(query: RoleQueryDto) {
    const { page, limit, search } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.RoleWhereInput = {};

    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    // Ejecutar la consulta paginada y el conteo dentro de una misma transacción.
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
}
