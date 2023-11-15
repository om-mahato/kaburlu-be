import { DB, DbType } from '@/drizzle/drizzle.provider';
import * as schema from '@/drizzle/schema';
import { Inject, Injectable } from '@nestjs/common';

export type User = typeof schema.users.$inferSelect;

@Injectable()
export class UsersService {
  constructor(
    @Inject(DB)
    private readonly db: DbType,
  ) {}

  async create(
    input: typeof schema.users.$inferInsert,
  ): Promise<User | undefined> {
    const users = await this.db.insert(schema.users).values(input).returning();
    return users[0];
  }

  async findById(id: User['id']): Promise<Omit<User, 'password'> | undefined> {
    return this.db.query.users.findFirst({
      columns: {
        password: false,
      },
      where: (users, { eq }) => eq(users.id, id),
    });
  }

  async findByEmail(
    email: User['email'],
  ): Promise<Omit<User, 'password'> | undefined> {
    return this.db.query.users.findFirst({
      columns: {
        password: false,
      },
      where: (users, { eq }) => eq(users.email, email),
    });
  }

  async authByEmail(email: User['email']): Promise<User | undefined> {
    return this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });
  }
}
