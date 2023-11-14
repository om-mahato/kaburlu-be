import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { SubCategoriesModule } from './sub_categories/sub_categories.module';
import { TagsModule } from './tags/tags.module';
import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DrizzleModule,
    AuthModule,
    TenantsModule,
    UsersModule,
    CategoriesModule,
    SubCategoriesModule,
    ArticlesModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
