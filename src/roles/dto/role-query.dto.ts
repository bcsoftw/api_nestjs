import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, IsString, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class RoleQueryDto {
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
    description: 'The search term to filter roles by name',
    example: 'search term',
  })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() || undefined : value,
  )
  @IsString()
  search?: string;
}
