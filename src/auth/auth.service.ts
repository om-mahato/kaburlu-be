import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as schema from 'src/drizzle/schema';
import { User, UsersService } from 'src/users/users.service';

export type JwtPayload = {
  sub: string;
  email: string;
  tenantId: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(input: typeof schema.users.$inferInsert): Promise<User> {
    return this.usersService.create(input);
  }

  async signIn(
    email: string,
    pass: string,
  ): Promise<{
    access_token: string;
  }> {
    const user = await this.usersService.findByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      tenantId: user.tenantId,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
