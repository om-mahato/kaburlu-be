import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    example: 'election2024',
    description: 'name of the tag',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: false,
    description: 'is tag active or not',
  })
  @IsBoolean()
  active: boolean;
}
