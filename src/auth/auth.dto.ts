import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'email of the admin',
  })
  @IsEmail()
  public email: string;

  @ApiProperty({ example: '****', description: 'password' })
  @IsStrongPassword()
  public password: string;
}

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'name of the user' })
  @IsString()
  public name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'email of the user',
  })
  @IsEmail()
  public email: string;

  @ApiProperty({ example: '****', description: 'password' })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  public password: string;

  @ApiPropertyOptional({
    example: '9899779899',
    description: 'phone number of the user',
  })
  @IsPhoneNumber('IN')
  public phoneNumber?: string;

  @ApiPropertyOptional({
    example: 'true',
    description: 'is user verified or not',
  })
  @IsBoolean()
  public isVerified?: boolean;
}
