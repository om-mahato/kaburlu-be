import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateBeaureauInchargeReporterDto,
  CreateMandalReporterDto,
  CreateRcReporterDto,
  CreateStaffReporterDto,
} from './admin.dto';
import { AuthService } from './auth.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register/:id/editor')
  @ApiOperation({ summary: 'Register editor' })
  @ApiBearerAuth()
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
  @ApiBearerAuth()
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
  @ApiBearerAuth()
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
  @ApiBearerAuth()
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
  @ApiBearerAuth()
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
}
