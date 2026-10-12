// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {  LoginDto , RefreshTokenDto, RegisterDto } from './dto/auth.dto';


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (userExists) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        roles: {
          create: dto.roleIds?.map((id) => ({ roleId: id })) || [],
        },
      },
    });

    return this.signToken(user.id, user.email, user.name);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (!user.isActive) {
      throw new UnauthorizedException('La cuenta de usuario está desactivada.');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches)
      throw new UnauthorizedException('Invalid credentials');

    return this.signToken(user.id, user.email, user.name);
  }

  async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ) {
    // Buscar al usuario en la base de datos
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Verificar que la contraseña actual sea correcta
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('La contraseña actual es incorrecta');
    }

    // Validar que la nueva contraseña no sea idéntica a la anterior (Opcional pero recomendado)
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new BadRequestException(
        'La nueva contraseña no puede ser igual a la anterior',
      );
    }

    // Encriptar la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Actualizar contraseña
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    return {
      message:
        'Contraseña actualizada exitosamente. Por favor, inicia sesión de nuevo.',
    };
  }

  
  async logout(dto: RefreshTokenDto) {
    try {
      // Eliminamos el token de la DB para invalidar la sesión por completo
      await this.prisma.refreshToken.delete({
        where: { token: dto.refreshToken },
      });
      return { message: 'Sesión cerrada exitosamente.' };
    } catch (error) {
      // Si el token ya no existía, manejamos el error elegantemente
      throw new UnauthorizedException('Token inválido o ya sesión cerrada.');
    }
  }


  async refreshToken(dto: RefreshTokenDto) {
    // Verificar si el token existe en la DB e incluir al usuario con sus roles
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { token: dto.refreshToken },
      include: {
        user: {
          include: { roles: true }, // Por si necesitas meter los roles en el payload del JWT
        },
      },
    });

    if (!storedToken) {
      throw new UnauthorizedException('Token no válido.');
    }

    if (storedToken.isRevoked) {
      throw new UnauthorizedException('Token revocado.');
    }

    // Verificar expiración temporal cronológica
    if (new Date() > storedToken.expiresAt) {
      await this.prisma.refreshToken
        .delete({ where: { token: dto.refreshToken } })
        .catch(() => {});
      throw new UnauthorizedException('Token expirado.');
    }

    if (!storedToken.user.isActive) {
      throw new UnauthorizedException('El usuario está inactivo.');
    }

    // Generar los nuevos Payloads de JWT
    const payload = {
      sub: storedToken.user.id,
      email: storedToken.user.email,
      name: storedToken.user.name,
    };

    const newAccessToken = this.jwtService.sign(payload, { expiresIn: '15m' }); // Token corto
    const newRefreshTokenString = this.jwtService.sign(payload, {
      expiresIn: '7d',
    }); // Token largo
    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días en el futuro

    // Transacción atómica: Borramos el viejo y guardamos el nuevo (Estrategia de Rotación Segura)
    await this.prisma.$transaction([
      this.prisma.refreshToken.delete({
        where: { token: dto.refreshToken },
      }),
      this.prisma.refreshToken.create({
        data: {
          token: newRefreshTokenString,
          userId: storedToken.userId,
          expiresAt: newExpiresAt,
        },
      }),
    ]);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshTokenString,
    };
  }

  private async signToken(userId: number, email: string, name: string) {
    const payload = { sub: userId, email, name };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshTokenString = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    //Guardar el Refresh Token en la base de datos
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días
    await this.prisma.refreshToken.create({
      data: {
        token: refreshTokenString,
        userId: userId,
        expiresAt,
      },
    });

    return {
      user: { id: userId, email: email, name: name },
      accessToken,
      refreshToken: refreshTokenString,
    };
 
  }
}
