import { jwtConfig } from '@/config/jwt.config';
import { TenantsModule } from '@/tenants/tenants.module';
import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { StaffController } from './staff.controller';

@Module({
  imports: [JwtModule.registerAsync(jwtConfig), UsersModule, TenantsModule],
  providers: [AuthService],
  controllers: [AuthController, StaffController],
  exports: [AuthService],
})
export class AuthModule {}
