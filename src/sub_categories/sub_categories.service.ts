import { DB, DbType } from '@/drizzle/drizzle.provider';
import * as schema from '@/drizzle/schema';
import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

export type SubCategories = typeof schema.subCategories.$inferSelect;
export type NewSubCategories = typeof schema.subCategories.$inferInsert;

@Injectable()
export class SubCategoriesService {
  constructor(
    @Inject(DB)
    private readonly db: DbType,
  ) {}

  create(input: NewSubCategories): Promise<SubCategories | undefined> {
    return this.db.insert(schema.subCategories).values(input).returning()[0];
  }

  find(tenantId: string) {
    return this.db.query.subCategories.findMany({
      where: (subCategories, { eq }) => eq(subCategories.tenantId, tenantId),
    });
  }

  findById(
    id: SubCategories['id'],
    tenantId: string,
  ): Promise<SubCategories | undefined> {
    return this.db.query.subCategories.findFirst({
      where: (subCategories, { eq, and }) =>
        and(eq(subCategories.id, id), eq(subCategories.tenantId, tenantId)),
    });
  }

  update(
    id: SubCategories['id'],
    tenantId: string,
    input: Partial<NewSubCategories>,
  ) {
    return this.db
      .update(schema.subCategories)
      .set(input)
      .where(
        and(
          eq(schema.subCategories.id, id),
          eq(schema.subCategories.tenantId, tenantId),
        ),
      )
      .returning()[0];
  }

  delete(id: SubCategories['id'], tenantId: string) {
    return this.db
      .delete(schema.subCategories)
      .where(
        and(
          eq(schema.subCategories.id, id),
          eq(schema.subCategories.tenantId, tenantId),
        ),
      );
  }
}
