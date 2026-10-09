import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AssignPermissionDto {
  @ApiProperty({
    description: 'The id of the permission to assign to the role',
    example: '1',
  })
  @IsInt()
  @IsNotEmpty()
  permissionId: number;
}
