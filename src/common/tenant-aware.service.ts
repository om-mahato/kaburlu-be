import { RequestWithUser } from '@/auth/auth.service';
import { DbType } from '@/drizzle/drizzle.provider';
import * as schema from '@/drizzle/schema';
import type { Request } from 'express';

type Schema = typeof schema;

export abstract class TenantAwareService {
  constructor(
    protected db: DbType,
    protected schema: keyof Schema,
  ) {}

  protected getTenantId(request: RequestWithUser) {
    if (request.user && request.user.tenantId) {
      return request.user.tenantId;
    }
    throw new Error('Tenant ID not found in request');
  }

  protected queryBuilder(request: Request) {
    const tenantId = this.getTenantId(request);
    return this.db.query[this.schema].where((item, { eq }) =>
      eq(item.tenant_id, tenantId),
    );
  }

  // Add tenant-scoped CRUD methods here
}
