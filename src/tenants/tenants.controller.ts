import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Tenant, TenantInput, TenantsService } from './tenants.service';

@ApiBearerAuth()
@ApiTags('tenants')
@Controller('tenants')
export class TenantsController {
  constructor(private tenantsService: TenantsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Create a tenant' })
  create(@Body() input: TenantInput) {
    return this.tenantsService.create(input);
  }

  @HttpCode(HttpStatus.CREATED)
  @Get('users')
  @ApiOperation({ summary: 'Get all users of a tenant' })
  getUsers(@Req() tenantId: Tenant['id']) {
    return this.tenantsService.getUsers(tenantId);
  }
}
