import { FindOneParams } from '@/common/common.dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  CreateBeaureauInchargeReporterDto,
  CreateEditorDto,
  CreateMandalReporterDto,
  CreateRcReporterDto,
  CreateStaffReporterDto,
} from './staff.dto';

@ApiTags('staff')
@Controller('staff')
export class StaffController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register/:id/editor')
  @ApiOperation({ summary: 'Register editor' })
  @ApiParam({
    name: 'id',
    description: 'id of the tenant',
  })
  @ApiBearerAuth()
  editorReporter(
    @Param() params: FindOneParams,
    @Body() signUpDto: CreateEditorDto,
  ) {
    return this.authService.signUp({
      ...signUpDto,
      tenantId: params.id,
      role: 'editor',
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('register/:id/reporter/beaureau-incharge')
  @ApiOperation({
    summary:
      'Register reporter who is beaureau incharge. In charge of multiple district.',
  })
  @ApiParam({
    name: 'id',
    description: 'id of the tenant',
  })
  @ApiBearerAuth()
  beaureauInChargeSignup(
    @Param() params: FindOneParams,
    @Body() { info, ...rest }: CreateBeaureauInchargeReporterDto,
  ) {
    return this.authService.signUp({
      ...rest,
      tenantId: params.id,
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
  @ApiParam({
    name: 'id',
    description: 'id of the tenant',
  })
  @ApiBearerAuth()
  staffReporterSignup(
    @Param() params: FindOneParams,
    @Body() { info, ...rest }: CreateStaffReporterDto,
  ) {
    return this.authService.signUp({
      ...rest,
      tenantId: params.id,
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
  @ApiParam({
    name: 'id',
    description: 'id of the tenant',
  })
  @ApiBearerAuth()
  rcReporterSignup(
    @Param() params: FindOneParams,
    @Body() { info, ...rest }: CreateRcReporterDto,
  ) {
    return this.authService.signUp({
      ...rest,
      tenantId: params.id,
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
  @ApiParam({
    name: 'id',
    description: 'id of the tenant',
  })
  @ApiBearerAuth()
  mandalReporterSignup(
    @Param() params: FindOneParams,
    @Body() { info, ...rest }: CreateMandalReporterDto,
  ) {
    return this.authService.signUp({
      ...rest,
      tenantId: params.id,
      role: 'reporter',
      info: {
        ...info,
        level: 'mandal',
      },
    });
  }
}
