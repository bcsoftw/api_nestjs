import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsInt } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({
    description: 'The name of the role',
    example: 'UPDATE_USER',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The permissions assigned to the role',
    example: '[1,2,3]',
  })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  permissionIds?: number[]; // IDs de los nuevos permisos que tendrá el rol
}


