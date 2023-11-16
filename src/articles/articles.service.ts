import { UserEntity } from '@/auth/auth.service';
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

  find({ tenantId, role }: UserEntity) {
    return this.db.query.articles.findMany({
      where: (articles, { eq }) =>
        role === 'super_admin' ? undefined : eq(articles.tenantId, tenantId),
    });
  }

  findById(
    id: Article['id'],
    { tenantId, role }: UserEntity,
  ): Promise<Article | undefined> {
    return this.db.query.articles.findFirst({
      where: (articles, { eq, and }) =>
        role === 'super_admin'
          ? undefined
          : and(eq(articles.id, id), eq(articles.tenantId, tenantId)),
    });
  }

  update(
    id: Article['id'],
    { tenantId, role }: UserEntity,
    input: Partial<NewArticle>,
  ) {
    return this.db
      .update(schema.articles)
      .set(input)
      .where(
        role === 'super_admin'
          ? undefined
          : and(
              eq(schema.articles.id, id),
              eq(schema.articles.tenantId, tenantId),
            ),
      )
      .returning()[0];
  }

  delete(id: Article['id'], { tenantId, role }: UserEntity) {
    return this.db
      .delete(schema.articles)
      .where(
        role === 'super_admin'
          ? undefined
          : and(
              eq(schema.articles.id, id),
              eq(schema.articles.tenantId, tenantId),
            ),
      );
  }
}
