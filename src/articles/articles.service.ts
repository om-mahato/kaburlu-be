import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ASYNC_PROVIDER } from 'src/drizzle/drizzle.provider';
import * as schema from 'src/drizzle/schema';

export type Article = typeof schema.articles.$inferSelect;
export type NewArticle = typeof schema.articles.$inferInsert;

@Injectable()
export class ArticlesService {
  constructor(
    @Inject(DRIZZLE_ASYNC_PROVIDER)
    private db: PostgresJsDatabase<typeof schema>,
  ) {}

  create(input: NewArticle): Promise<Article | undefined> {
    return this.db.insert(schema.articles).values(input).returning()[0];
  }

  find() {
    return this.db.query.articles.findMany();
  }

  findById(id: Article['id']): Promise<Article | undefined> {
    return this.db.query.articles.findFirst({
      where: (articles, { eq }) => eq(articles.id, id),
    });
  }

  update(id: Article['id'], input: Partial<NewArticle>) {
    return this.db
      .update(schema.articles)
      .set(input)
      .where(eq(schema.articles.id, id))
      .returning()[0];
  }

  delete(id: Article['id']) {
    return this.db.delete(schema.articles).where(eq(schema.articles.id, id));
  }
}
