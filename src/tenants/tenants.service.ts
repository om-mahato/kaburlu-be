import { DB, DbType } from '@/drizzle/drizzle.provider';
import * as schema from '@/drizzle/schema';
import { User } from '@/users/users.service';
import { Inject, Injectable } from '@nestjs/common';

export type Tenant = typeof schema.tenants.$inferSelect;
export type TenantInput = typeof schema.tenants.$inferInsert;

@Injectable()
export class TenantsService {
  constructor(
    @Inject(DB)
    private readonly db: DbType,
  ) {}

  async findOne(id: Tenant['id']): Promise<Tenant | undefined> {
    return this.db.query.tenants.findFirst({
      where: (tenants, { eq }) => eq(tenants.id, id),
    });
  }

  async create(input: TenantInput): Promise<Tenant | undefined> {
    const tenants = await this.db
      .insert(schema.tenants)
      .values(input)
      .returning();
    return tenants[0];
  }

  async getUsers(tenantId: Tenant['id']): Promise<User[] | undefined> {
    return this.db.query.tenants.findMany({
      where: (tenants, { eq }) => eq(tenants.id, tenantId),
      with: {
        users: true,
      },
    });
  }
}
