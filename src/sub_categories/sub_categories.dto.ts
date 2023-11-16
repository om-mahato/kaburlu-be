import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUrl } from 'class-validator';

class Img {
  @IsUrl()
  url: string;
}

export class CreateSubCategoryDto {
  @ApiProperty({
    example: 'football',
    description: 'name of the category',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: false,
    description: 'is category active or not',
  })
  @IsBoolean()
  active?: boolean;

  @ApiProperty({
    example: {
      src: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    },
    description: 'image url',
  })
  image: Img;

  @ApiProperty({
    example: 'dcscsdce23e23',
    description: 'category id',
  })
  @IsString()
  categoryId: string;
}
