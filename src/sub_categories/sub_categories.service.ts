import { UserEntity } from '@/auth/auth.service';
import { DB, DbType } from '@/drizzle/drizzle.provider';
import * as schema from '@/drizzle/schema';
import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

export type SubCategory = typeof schema.subCategories.$inferSelect;
export type NewSubCategory = typeof schema.subCategories.$inferInsert;

@Injectable()
export class SubCategoriesService {
  constructor(
    @Inject(DB)
    private readonly db: DbType,
  ) {}

  create(input: NewSubCategory): Promise<SubCategory | undefined> {
    return this.db.insert(schema.categories).values(input).returning()[0];
  }

  findPublic() {
    return this.db.query.categories.findMany();
  }

  findByIdPublic(id: SubCategory['id']): Promise<SubCategory | undefined> {
    return this.db.query.subCategories.findFirst({
      where: (categories, { eq, and }) => eq(categories.id, id),
    });
  }

  find({ tenantId, role }: UserEntity) {
    return this.db.query.subCategories.findMany({
      where: (categories, { eq }) =>
        role === 'super_admin' ? undefined : eq(categories.tenantId, tenantId),
    });
  }

  findById(
    id: SubCategory['id'],
    { tenantId, role }: UserEntity,
  ): Promise<SubCategory | undefined> {
    return this.db.query.subCategories.findFirst({
      where: (categories, { eq, and }) =>
        role === 'super_admin'
          ? undefined
          : and(eq(categories.id, id), eq(categories.tenantId, tenantId)),
    });
  }

  update(
    id: SubCategory['id'],
    { tenantId, role }: UserEntity,
    input: Partial<NewSubCategory>,
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

  delete(id: SubCategory['id'], { tenantId, role }: UserEntity) {
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
