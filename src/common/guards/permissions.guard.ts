import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { UsersService } from '../../users/users.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Obtener los permisos requeridos en el endpoint
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Si el endpoint no tiene el decorador @RequirePermissions, se permite el acceso libre
    if (!requiredPermissions) return true;

    // 2. Obtener el usuario desde la petición (inyectado previamente por tu AuthGuard)
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado en la petición');
    }

    // 3. Buscar los permisos reales del usuario en la Base de Datos
    const userProfile = await this.usersService.findOneWithPermissions(user.id);

    // Si es un superusuario "ADMIN", se salta la validación de permisos individuales
    if (userProfile.roles.includes('ADMIN')) return true;

    // 4. Verificar si el usuario cuenta con TODOS los permisos requeridos
    const hasPermission = requiredPermissions.every((permission) =>
      userProfile.permissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        'No tienes los permisos suficientes para realizar esta acción',
      );
    }

    return true;
  }
}
