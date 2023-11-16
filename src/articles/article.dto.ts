// title: varchar('title', { length: 30 }).notNull(),
//     slug: varchar('title').notNull(),
//     summary: varchar('description', { length: 60 }).notNull(),
//     content: varchar('content', { length: 160 }).notNull(),
//     images: jsonb('images').$type<Pic[]>(),
//     video: jsonb('video').$type<Vid>(),
//     active: boolean('active').default(true),
//     categoryId: varchar('category_id').references(() => categories.id),
//     subCategoryId: varchar('sub_category_id').references(
//       () => subCategories.id,
//     ),
//     breakingNews: boolean('is_breaking').default(false),
//     seo: jsonb('seo').$type<SeoInfo>(),
//     published: boolean('published').default(false),
//     sourceId: varchar('source_id'),

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsString, IsUrl } from 'class-validator';

class Img {
  @IsUrl()
  url: string;
}

class Video {
  @IsUrl()
  url: string;
}

class SEO {
  @ApiProperty({
    example: 'Modi visits telengana. Meets KCR.',
    description: 'seo title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'Modi visits telengana on Tuesday under high security. Meets KCR and other ministers.',
    description: 'seo description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: ['modi', 'telengana', 'KCR'],
    description: 'seo keywords',
  })
  @IsArray()
  keywords: string[];
}

//     location: jsonb('location').$type<Location>(),
export class CreateArticleDto {
  @ApiProperty({
    example: 'Modi visits telengana',
    description: 'title of the news article',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Modi visits telengana on Tuesday under high security',
    description: 'short news',
  })
  @IsString()
  summary: string;

  @ApiProperty({
    example:
      'Modi visits telengana on Tuesday under high security. Meets KCR and other ministers.',
    description: 'long form news content',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: false,
    description: 'is article active or not',
  })
  @IsBoolean()
  active: boolean;

  @ApiProperty({
    example: 'politics',
    description: 'category of the article defined by admin or superadmin',
  })
  @IsString()
  categoryId: string;

  @ApiProperty({
    example: '2024 elections',
    description: 'sub category of the article defined by admin or superadmin',
  })
  @IsString()
  subCategoryId: string;

  @ApiProperty({
    example: [
      {
        src: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      },
    ],
    description: 'image url',
  })
  images: Img[];

  @ApiProperty({
    example: {
      url: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    },
    description: 'video url',
  })
  video: Video;

  @ApiProperty({
    example: true,
    description: 'is braking news or not',
  })
  @IsBoolean()
  breakingNews: boolean;

  seo: SEO;

  @ApiProperty({
    example: true,
    description: 'is article published or not',
  })
  @IsBoolean()
  published: boolean;

  @ApiProperty({
    example: 'csdcsdcsd2e23ecsdc',
    description:
      'admin id of the newspaper on basis of which news has been added',
  })
  @IsString()
  sourceId: string;

  @ApiProperty({
    example: 'Hyderabad',
    description: 'location of the news',
  })
  @IsString()
  location: string;
}
