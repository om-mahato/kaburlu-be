import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ASYNC_PROVIDER } from 'src/drizzle/drizzle.provider';
import * as schema from 'src/drizzle/schema';

export type Tag = typeof schema.tags.$inferSelect;
export type NewTag = typeof schema.tags.$inferInsert;

@Injectable()
export class TagsService {
  constructor(
    @Inject(DRIZZLE_ASYNC_PROVIDER)
    private db: PostgresJsDatabase<typeof schema>,
  ) {}

  create(input: NewTag): Promise<Tag | undefined> {
    return this.db.insert(schema.tags).values(input).returning()[0];
  }

  find() {
    return this.db.query.tags.findMany();
  }

  findById(id: Tag['id']): Promise<Tag | undefined> {
    return this.db.query.tags.findFirst({
      where: (tags, { eq }) => eq(tags.id, id),
    });
  }

  update(id: Tag['id'], input: Partial<NewTag>) {
    return this.db
      .update(schema.tags)
      .set(input)
      .where(eq(schema.tags.id, id))
      .returning()[0];
  }

  delete(id: Tag['id']) {
    return this.db.delete(schema.tags).where(eq(schema.tags.id, id));
  }
}
