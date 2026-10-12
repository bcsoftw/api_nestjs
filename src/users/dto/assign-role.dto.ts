import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AssignRoleDto {
  @ApiProperty({
      description: 'The id of the role to assign to the user',
      example: '1',
  })
  @IsInt()
  @IsNotEmpty()
  roleId: number;
}
