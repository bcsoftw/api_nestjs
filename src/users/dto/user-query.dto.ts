import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsInt,
  Min,
  IsString,
  IsBoolean,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UserQueryDto {
  @ApiProperty({
    description: 'The page number for pagination',
    example: '1',
  })
  @IsOptional()
  @Transform(({ value }) => (value === undefined ? 1 : Number(value)))
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiProperty({
    description: 'The number of items per page for pagination',
    example: '10',
  })
  @IsOptional()
  @Transform(({ value }) => (value === undefined ? 10 : Number(value)))
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @ApiProperty({
    description: 'The search term to filter users by name',
    example: 'search term',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'The search term to filter users by status',
    example: 'true',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined) return undefined;
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'The search term to filter users by role',
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  role?: string;
}
