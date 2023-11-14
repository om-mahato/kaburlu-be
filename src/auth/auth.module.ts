import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { TenantsModule } from 'src/tenants/tenants.module';
import { UsersModule } from 'src/users/users.module';
import { AdminController } from './admin.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.registerAsync(jwtConfig), UsersModule, TenantsModule],
  providers: [AuthService],
  controllers: [AuthController, AdminController],
  exports: [AuthService],
})
export class AuthModule {}
