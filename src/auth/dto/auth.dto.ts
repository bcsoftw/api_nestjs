
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsEmail,
  IsString,
  IsEnum,
  IsBoolean,
  IsOptional,
  MinLength,
  IsInt,
  IsArray,
} from 'class-validator';

// DTO Base: Contiene las reglas estrictas de cada campo del User
export class BaseUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email!: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  name!: string;

  @ApiProperty({
    description: 'The roles of the user',
    example: '[1,2,3]',
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  roleIds?: number[];

  @ApiProperty({
    description: 'The status of the user',
    example: 'true',
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

// Login DTO: Solo requiere email y password (hereda las validaciones base)
export class LoginDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email!: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString()
  password!: string; // En login no validamos MinLength por si cambian las reglas globales
}

// Register DTO: Reutiliza el base completo para crear un usuario
export class RegisterDto extends BaseUserDto {}

// Update User DTO: Hace que todos los campos del base sean opcionales
export class UpdateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The roles of the user',
    example: '[1,2,3]',
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  roleIds?: number[];

  @ApiProperty({
    description: 'The status of the user',
    example: 'true',
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: 'The refresh token of the user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  refreshToken!: string;
}


export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'La nueva contraseña debe tener al menos 6 caracteres',
  })
  newPassword: string;
}
