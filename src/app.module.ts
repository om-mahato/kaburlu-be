import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TenantsModule } from './tenants/tenants.module';
import { CategoriesModule } from './categories/categories.module';
import { SubCategoriesModule } from './sub_categories/sub_categories.module';
import { ArticlesModule } from './articles/articles.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [DrizzleModule, AuthModule, UsersModule, TenantsModule, CategoriesModule, SubCategoriesModule, ArticlesModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
