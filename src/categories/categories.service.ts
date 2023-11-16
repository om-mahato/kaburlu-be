import { UserEntity } from '@/auth/auth.service';
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

  findPublic() {
    return this.db.query.categories.findMany();
  }

  findByIdPublic(id: Category['id']): Promise<Category | undefined> {
    return this.db.query.categories.findFirst({
      where: (categories, { eq, and }) => eq(categories.id, id),
    });
  }

  find({ tenantId, role }: UserEntity) {
    return this.db.query.categories.findMany({
      where: (categories, { eq }) =>
        role === 'super_admin' ? undefined : eq(categories.tenantId, tenantId),
    });
  }

  findById(
    id: Category['id'],
    { tenantId, role }: UserEntity,
  ): Promise<Category | undefined> {
    return this.db.query.categories.findFirst({
      where: (categories, { eq, and }) =>
        role === 'super_admin'
          ? undefined
          : and(eq(categories.id, id), eq(categories.tenantId, tenantId)),
    });
  }

  update(
    id: Category['id'],
    { tenantId, role }: UserEntity,
    input: Partial<NewCategory>,
  ) {
    return this.db
      .update(schema.categories)
      .set(input)
      .where(
        role === 'super_admin'
          ? undefined
          : and(
              eq(schema.categories.id, id),
              eq(schema.categories.tenantId, tenantId),
            ),
      )
      .returning()[0];
  }

  delete(id: Category['id'], { tenantId, role }: UserEntity) {
    return this.db
      .delete(schema.categories)
      .where(
        role === 'super_admin'
          ? undefined
          : and(
              eq(schema.categories.id, id),
              eq(schema.categories.tenantId, tenantId),
            ),
      );
  }
}
