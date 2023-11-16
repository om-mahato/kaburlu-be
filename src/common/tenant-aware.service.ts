import { DbType } from '@/drizzle/drizzle.provider';
import * as schema from '@/drizzle/schema';

type Schema = typeof schema;

export abstract class TenantAwareService {
  constructor(
    protected db: DbType,
    protected schema: keyof Schema,
  ) {}

  protected queryBuilder(tenantId) {
    return this.db.query[this.schema].where((item, { eq }) =>
      eq(item.tenant_id, tenantId),
    );
  }

  // Add tenant-scoped CRUD methods here
}
