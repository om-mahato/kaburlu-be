import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateAdminDto,
  CreateBeaureauInchargeReporterDto,
  CreateMandalReporterDto,
  CreateRcReporterDto,
  CreateStaffReporterDto,
} from './auth.dto';
import { AuthGuard } from './auth.gaurd';
import { AuthService, JwtPayload } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: 'Register app user' })
  signup(
    @Body() signUpDto: { email: string; password: string; tenantId: string },
  ) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register/admin')
  @ApiOperation({ summary: 'Register newspaper admin' })
  signupAdmin(@Body() signUpDto: CreateAdminDto) {
    return this.authService.signUpAdmin(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register/:id/editor')
  @ApiOperation({ summary: 'Register editor' })
  editorReporter(
    @Param() id: string,
    @Body() signUpDto: { email: string; password: string },
  ) {
    return this.authService.signUp({
      ...signUpDto,
      tenantId: id,
      role: 'editor',
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('register/:id/reporter/beaureau-incharge')
  @ApiOperation({
    summary:
      'Register reporter who is beaureau incharge. In charge of multiple district.',
  })
  beaureauInChargeSignup(
    @Param() id: string,
    @Body() { info, ...rest }: CreateBeaureauInchargeReporterDto,
  ) {
    return this.authService.signUp({
      ...rest,
      tenantId: id,
      role: 'editor',
      info: {
        ...info,
        level: 'beaureau',
      },
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('register/:id/reporter/staff-reporter')
  @ApiOperation({ summary: 'Register staff reporter' })
  staffReporterSignup(
    @Param() id: string,
    @Body() { info, ...rest }: CreateStaffReporterDto,
  ) {
    return this.authService.signUp({
      ...rest,
      tenantId: id,
      role: 'reporter',
      info: {
        ...info,
        level: 'staff',
      },
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('register/:id/reporter/rc-reporter')
  @ApiOperation({ summary: 'Register rc reporter' })
  rcReporterSignup(
    @Param() id: string,
    @Body() { info, ...rest }: CreateRcReporterDto,
  ) {
    return this.authService.signUp({
      ...rest,
      tenantId: id,
      role: 'reporter',
      info: {
        ...info,
        level: 'rc',
      },
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('register/:id/reporter/mandal-reporter')
  @ApiOperation({ summary: 'Register mandal reporter' })
  mandalReporterSignup(
    @Param() id: string,
    @Body() { info, ...rest }: CreateMandalReporterDto,
  ) {
    return this.authService.signUp({
      ...rest,
      tenantId: id,
      role: 'reporter',
      info: {
        ...info,
        level: 'mandal',
      },
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  signIn(@Body() signInDto: { email: string; password: string }) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user as JwtPayload;
  }
}
