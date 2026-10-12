import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsBoolean, IsArray, IsInt } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString()
  @IsOptional()
  password?: string; // Recuerda encriptarla antes de guardarla si cambia

  @ApiProperty({
    description: 'The status of the user',
    example: 'true',
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    description: 'The roles of the user',
    example: '[1,2,3]',
  })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  roleIds?: number[]; // IDs de los roles que tendrá el usuario
}
