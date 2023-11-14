import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ASYNC_PROVIDER } from 'src/drizzle/drizzle.provider';
import * as schema from 'src/drizzle/schema';
import { z } from 'zod';

export type User = z.infer<typeof schema.selectUserSchema>;

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE_ASYNC_PROVIDER)
    private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async create(
    input: typeof schema.users.$inferInsert,
  ): Promise<User | undefined> {
    const users = await this.db.insert(schema.users).values(input).returning();
    return users[0];
  }

  async findByEmail(email: User['email']): Promise<User | undefined> {
    return this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });
  }
}
