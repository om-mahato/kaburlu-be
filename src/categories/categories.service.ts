import { DB, DbType } from '@/drizzle/drizzle.provider';
import * as schema from '@/drizzle/schema';
import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

export type Category = typeof schema.categories.$inferSelect;
export type NewCategory = typeof schema.categories.$inferInsert;

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(DB)
    private readonly db: DbType,
  ) {}

  create(input: NewCategory): Promise<Category | undefined> {
    return this.db.insert(schema.categories).values(input).returning()[0];
  }

  find(tenantId: string) {
    return this.db.query.categories.findMany({
      where: (categories, { eq }) => eq(categories.tenantId, tenantId),
    });
  }

  findById(
    id: Category['id'],
    tenantId: string,
  ): Promise<Category | undefined> {
    return this.db.query.categories.findFirst({
      where: (categories, { eq, and }) =>
        and(eq(categories.id, id), eq(categories.tenantId, tenantId)),
    });
  }

  update(id: Category['id'], tenantId: string, input: Partial<NewCategory>) {
    return this.db
      .update(schema.categories)
      .set(input)
      .where(
        and(
          eq(schema.categories.id, id),
          eq(schema.categories.tenantId, tenantId),
        ),
      )
      .returning()[0];
  }

  delete(id: Category['id'], tenantId: string) {
    return this.db
      .delete(schema.categories)
      .where(
        and(
          eq(schema.categories.id, id),
          eq(schema.categories.tenantId, tenantId),
        ),
      );
  }
}
