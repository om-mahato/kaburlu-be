import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'email of the admin',
  })
  public email: string;

  @ApiProperty({ example: '****', description: 'password' })
  public password: string;
}

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'name of the admin' })
  public name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'email of the admin',
  })
  public email: string;

  @ApiProperty({ example: '****', description: 'password' })
  public password: string;

  @ApiPropertyOptional({
    example: '9899779899',
    description: 'phone number of the admin',
  })
  public phoneNumber?: string;

  @ApiPropertyOptional({
    example: 'true',
    description: 'is admin verified or not',
  })
  public isVerified?: boolean;
}
