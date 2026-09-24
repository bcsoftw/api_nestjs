import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty({
    description: 'The id of the user',
    example: '1',
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'The roles of the user',
    example: '[1,2,3]',
  })
  @Expose()
  roles?: number[];

  @ApiProperty({
    description: 'The status of the user',
    example: 'true',
  })
  @Expose()
  isActive?: boolean;

  @ApiProperty({
    description: 'The creation date of the user',
    example: '2023-01-01T00:00:00.000Z',
  })
  @Expose()
  createdAt: Date;
}
