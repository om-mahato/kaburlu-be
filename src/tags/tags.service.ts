import { DB, DbType } from '@/drizzle/drizzle.provider';
import * as schema from '@/drizzle/schema';
import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

export type Tag = typeof schema.tags.$inferSelect;
export type NewTag = typeof schema.tags.$inferInsert;

@Injectable()
export class TagsService {
  constructor(
    @Inject(DB)
    private readonly db: DbType,
  ) {}

  create(input: NewTag): Promise<Tag | undefined> {
    return this.db.insert(schema.tags).values(input).returning()[0];
  }

  find(tenantId: string) {
    return this.db.query.tags.findMany({
      where: (tags, { eq }) => eq(tags.tenantId, tenantId),
    });
  }

  findById(id: Tag['id'], tenantId: string): Promise<Tag | undefined> {
    return this.db.query.tags.findFirst({
      where: (tags, { eq, and }) =>
        and(eq(tags.id, id), eq(tags.tenantId, tenantId)),
    });
  }

  update(id: Tag['id'], tenantId: string, input: Partial<NewTag>) {
    return this.db
      .update(schema.tags)
      .set(input)
      .where(and(eq(schema.tags.id, id), eq(schema.tags.tenantId, tenantId)))
      .returning()[0];
  }

  delete(id: Tag['id'], tenantId: string) {
    return this.db
      .delete(schema.tags)
      .where(and(eq(schema.tags.id, id), eq(schema.tags.tenantId, tenantId)));
  }
}
