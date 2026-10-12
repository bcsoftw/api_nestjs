import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsInt, IsOptional, MinLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'The name of the role',
    example: 'ADMIN',
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'The permissions assigned to the role',
    example: '[1,2,3]',
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  permissionIds?: number[];
}

