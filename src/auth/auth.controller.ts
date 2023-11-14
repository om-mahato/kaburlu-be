import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from './admin.dto';
import { CreateUserDto, UserLoginDto } from './auth.dto';
import { AuthGuard } from './auth.gaurd';
import { AuthService, JwtPayload } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: 'Register app user' })
  async signup(@Body() signUpDto: CreateUserDto) {
    const user = await this.authService.signUp(signUpDto);
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  signIn(@Body() signInDto: UserLoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register/admin')
  @ApiOperation({ summary: 'Register newspaper admin' })
  @ApiBearerAuth()
  signupAdmin(@Body() signUpDto: CreateAdminDto) {
    return this.authService.signUpAdmin(signUpDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user as JwtPayload;
  }
}
