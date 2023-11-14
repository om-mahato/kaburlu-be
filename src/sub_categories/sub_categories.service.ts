import { DB, DbType } from '@/drizzle/drizzle.provider';
import * as schema from '@/drizzle/schema';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

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

  find() {
    return this.db.query.subCategories.findMany();
  }

  findById(id: SubCategories['id']): Promise<SubCategories | undefined> {
    return this.db.query.subCategories.findFirst({
      where: (subCategories, { eq }) => eq(subCategories.id, id),
    });
  }

  update(id: SubCategories['id'], input: Partial<NewSubCategories>) {
    return this.db
      .update(schema.subCategories)
      .set(input)
      .where(eq(schema.subCategories.id, id))
      .returning()[0];
  }

  delete(id: SubCategories['id']) {
    return this.db
      .delete(schema.subCategories)
      .where(eq(schema.subCategories.id, id));
  }
}
