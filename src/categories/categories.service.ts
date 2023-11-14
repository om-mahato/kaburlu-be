import { DB, DbType } from '@/drizzle/drizzle.provider';
import * as schema from '@/drizzle/schema';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

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

  find() {
    return this.db.query.categories.findMany();
  }

  findById(id: Category['id']): Promise<Category | undefined> {
    return this.db.query.categories.findFirst({
      where: (categories, { eq }) => eq(categories.id, id),
    });
  }

  update(id: Category['id'], input: Partial<NewCategory>) {
    return this.db
      .update(schema.categories)
      .set(input)
      .where(eq(schema.categories.id, id))
      .returning()[0];
  }

  delete(id: Category['id']) {
    return this.db
      .delete(schema.categories)
      .where(eq(schema.categories.id, id));
  }
}
