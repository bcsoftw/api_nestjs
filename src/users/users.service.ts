import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //Crear un nuevo rol de usuario con roles asignados
  async create(data: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const rolesToConnect =
      data.roleIds && data.roleIds.length > 0 ? data.roleIds : [1];

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

  // Obtener todos los usuarios con sus roles
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

      // Validar si la lista está vacía
      if (!users || users.length === 0) {
        throw new NotFoundException('No se encontraron usuarios registrados.');
      }

      return users;
    } catch (error) {
      // Si es un NotFoundException, lo relanzamos directamente
      if (error instanceof NotFoundException) {
        throw error;
      }
      // Cualquier otro error (ej. caída de la base de datos) se maneja como error interno
      throw new InternalServerErrorException(
        'Error inesperado al recuperar los usuarios.',
      );
    }
  }

  // Obtener un usuario con sus roles y TODOS sus permisos heredados
  async findOneWithPermissions(id: number) {
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
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);

    // Aplanar la estructura para devolver una lista limpia de roles y permisos
    const roles = user.roles.map((ur) => ur.role.name);
    const permissions = user.roles.flatMap((ur) =>
      ur.role.permissions.map((rp) => rp.permission.name),
    );

    // Eliminar permisos duplicados
    const uniquePermissions = [...new Set(permissions)];

    return {
      id: user.id,
      email: user.email,
      roles,
      permissions: uniquePermissions,
    };
  }

  // Asignar un nuevo rol a un usuario existente
  async assignRole(userId: number, roleId: number) {
    //Validar que el usuario exista
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      throw new NotFoundException('El usuario no existe.');
    }

    // Validar que el rol exista
    const roleExists = await this.prisma.role.findUnique({
      where: { id: roleId },
    });
    if (!roleExists) {
      throw new NotFoundException('El rol especificado no existe.');
    }

    // Validar que el usuario no tenga ya este rol asignado
    const alreadyHasRole = await this.prisma.userRole.findUnique({
      where: {
        userId_roleId: { userId, roleId }, // Requiere que userId y roleId sean una llave primaria compuesta en tu esquema de Prisma
      },
    });
    if (alreadyHasRole) {
      throw new NotFoundException('El usuario ya tiene asignado este rol.');
    }

    //Crear la asignación si todas las validaciones pasan
    return this.prisma.userRole.create({
      data: { userId, roleId },
    });
  }

  // Remover un rol de un usuario
  async removeRole(userId: number, roleId: number) {
    // Validar que la asignación del rol exista
    const roleAssignment = await this.prisma.userRole.findUnique({
      where: {
        userId_roleId: { userId, roleId },
      },
    });

    if (!roleAssignment) {
      throw new NotFoundException('El usuario no tiene asignado este rol.');
    }

    return this.prisma.userRole.delete({
      where: {
        userId_roleId: { userId, roleId },
      },
    });
  }

  // Remover un usuario
  async removeUser(userId: number) {
    try {
      return await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error: any) {
      // Prisma lanza un código de error 'P2025' cuando el registro a eliminar no existe
      if (error.code === 'P2025') {
        throw new NotFoundException('El usuario no existe.');
      }

      // Propagar cualquier otro error inesperado de la base de datos
      throw error;
    }
  }

  // Actualizar un usuario
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const { email, password, roleIds, ...restOfData } = updateUserDto;

    // Verificar si el usuario existe
    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException(`El usuario con ID ${id} no existe`);
    }

    // Si se va a cambiar el email, verificar que no esté duplicado
    if (email && email !== existingUser.email) {
      const emailTaken = await this.prisma.user.findUnique({
        where: { email },
      });
      if (emailTaken) {
        throw new ConflictException(`El email '${email}' ya está en uso`);
      }
    }

    // Preparar los datos básicos a actualizar
    const dataToUpdate: any = { ...restOfData };
    if (email) dataToUpdate.email = email;

    // Si la contraseña viene en el DTO, la encriptamos antes de salvar
    if (password) {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    // 4. Ejecutar la actualización completa en una transacción de Prisma
    return this.prisma.$transaction(async (tx) => {
      // Si se envió el arreglo de roleIds (incluso si viene vacío para quitar todos los roles)
      if (roleIds !== undefined) {
        // Eliminar las relaciones de roles actuales del usuario
        await tx.userRole.deleteMany({
          where: { userId: id },
        });

        // Insertar las nuevas relaciones de roles
        if (roleIds.length > 0) {
          await tx.userRole.createMany({
            data: roleIds.map((roleId) => ({
              userId: id,
              roleId: roleId,
            })),
          });
        }
      }

      // Actualizar los datos del usuario y retornar el registro con sus nuevos roles
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
              role: true, // Incluye la información del rol mapeado si lo requieres
            },
          },
        },
      });
    });
  }

  async findAllPaginate(query: UserQueryDto) {
    const { page, limit, search, isActive, role } = query;
    const skip = (page - 1) * limit;

    // Construcción dinámica del filtro 'where' de Prisma
    const where: Prisma.UserWhereInput = {};

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

    // Ejecutar la consulta paginada y el conteo dentro de una misma transacción.
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
}
