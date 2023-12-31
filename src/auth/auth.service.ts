import * as schema from '@/drizzle/schema';
import { TenantsService } from '@/tenants/tenants.service';
import { User, UsersService } from '@/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

export type UserEntity = {
  sub: string;
  email: User['email'];
  tenantId: User['tenantId'];
  role: User['role'];
};

type AdminSignup = Omit<
  typeof schema.users.$inferInsert & {
    tenantInfo: typeof schema.tenants.$inferInsert;
  },
  'tenantId'
>;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tenantsService: TenantsService,
    private jwtService: JwtService,
  ) {}

  async signUp(input: typeof schema.users.$inferInsert): Promise<User> {
    input.password = await argon2.hash(input.password);
    return this.usersService.create(input);
  }

  async signIn(
    email: string,
    pass: string,
  ): Promise<{
    access_token: string;
  }> {
    const user = await this.usersService.authByEmail(email);
    const match = await argon2.verify(user.password, pass);
    if (!user || !match) {
      throw new UnauthorizedException();
    }
    const payload: UserEntity = {
      sub: user.id,
      email: user.email,
      tenantId: user.tenantId,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUpAdmin({ tenantInfo, ...input }: AdminSignup) {
    // console.log('tenant', tenantInfo, input);
    const tenant = await this.tenantsService.create(tenantInfo);
    return this.signUp({
      ...input,
      tenantId: tenant.id,
      role: 'admin',
    });
  }
}
