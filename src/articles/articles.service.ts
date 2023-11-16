import { DB, DbType } from '@/drizzle/drizzle.provider';
import * as schema from '@/drizzle/schema';
import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

export type Article = typeof schema.articles.$inferSelect;
export type NewArticle = typeof schema.articles.$inferInsert;

@Injectable()
export class ArticlesService {
  constructor(
    @Inject(DB)
    private readonly db: DbType,
  ) {}

  create(input: NewArticle): Promise<Article | undefined> {
    return this.db.insert(schema.articles).values(input).returning()[0];
  }

  findPublic() {
    return this.db.query.articles.findMany();
  }

  findByIdPublic(id: Article['id']): Promise<Article | undefined> {
    return this.db.query.articles.findFirst({
      where: (articles, { eq, and }) => eq(articles.id, id),
    });
  }

  find(tenantId: string) {
    return this.db.query.articles.findMany({
      where: (articles, { eq }) => eq(articles.tenantId, tenantId),
    });
  }

  findById(id: Article['id'], tenantId: string): Promise<Article | undefined> {
    return this.db.query.articles.findFirst({
      where: (articles, { eq, and }) =>
        and(eq(articles.id, id), eq(articles.tenantId, tenantId)),
    });
  }

  update(id: Article['id'], tenantId: string, input: Partial<NewArticle>) {
    return this.db
      .update(schema.articles)
      .set(input)
      .where(
        and(eq(schema.articles.id, id), eq(schema.articles.tenantId, tenantId)),
      )
      .returning()[0];
  }

  delete(id: Article['id'], tenantId: string) {
    return this.db
      .delete(schema.articles)
      .where(
        and(eq(schema.articles.id, id), eq(schema.articles.tenantId, tenantId)),
      );
  }
}
