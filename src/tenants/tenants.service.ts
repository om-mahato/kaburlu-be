import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ASYNC_PROVIDER } from 'src/drizzle/drizzle.provider';
import * as schema from 'src/drizzle/schema';
import { User } from 'src/users/users.service';
import { z } from 'zod';

export type Tenant = z.infer<typeof schema.selectTenantSchema>;
export type TenantInput = typeof schema.tenants.$inferInsert;

@Injectable()
export class TenantsService {
  constructor(
    @Inject(DRIZZLE_ASYNC_PROVIDER)
    private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async findOne(id: Tenant['id']): Promise<Tenant | undefined> {
    return this.db.query.tenants.findFirst({
      where: (tenants, { eq }) => eq(tenants.id, id),
    });
  }

  async create(input: TenantInput): Promise<Tenant | undefined> {
    return this.db.insert(schema.tenants).values(input).returning()[0];
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
