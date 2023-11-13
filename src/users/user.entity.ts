import { ApiProperty } from '@nestjs/swagger';
import * as schema from 'src/drizzle/schema';
import { z } from 'zod';

type UserType = z.infer<typeof schema.selectUserSchema>;

export class User {
  /**
   * The name of the Cat
   * @example Kitty
   */
  email: UserType['email'];

  @ApiProperty({ example: 1, description: 'The id of tenant' })
  tenantId: UserType['tenantId'];

  @ApiProperty({
    example: 'John Doe',
    description: 'The name fo user',
  })
  name: UserType['name'];
}
