import { User } from '@/user.decorator';
import { UsersService } from '@/users/users.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UserLoginDto } from './auth.dto';
import { AuthGuard } from './auth.gaurd';
import { AuthService, UserEntity } from './auth.service';
import { CreateAdminDto } from './staff.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

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
  getProfile(@User() reqUser: UserEntity) {
    const user = this.usersService.findById(reqUser.sub);
    return user;
  }
}
