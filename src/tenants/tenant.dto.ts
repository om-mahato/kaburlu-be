// domain: varchar('domain').$type<Domain>().notNull(),
//     language: varchar('language').notNull(),
//     rniNumber: varchar('rni_number'),
//     publisherName: varchar('publisher_name'),
//     publisherContactNumber: varchar('publisher_contact_number'),
//     chiefEditorName: varchar('chief_editor_name'),
//     contactNumber: varchar('contact_number'),
//     circulationState: varchar('circulation_state'),
//     address: jsonb('address').$type<Address>().notNull(),

import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsPostalCode, IsString, IsUrl } from 'class-validator';

class Address {
  @ApiProperty({
    example: 'Flat No. 101',
    description: 'Address Line 1 of the tenant',
  })
  @IsString()
  addressLine1: string;

  @ApiProperty({
    example: 'RGV Road',
    description: 'Address Line 2 of the tenant',
  })
  @IsString()
  addressLine2?: string;

  @ApiProperty({
    example: 'Hyderabad',
    description: 'City of the tenant',
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: 'Telangana',
    description: 'State of the tenant',
  })
  @IsString()
  state: string;

  @ApiProperty({
    example: '500001',
    description: 'Pincode of the tenant',
  })
  @IsPostalCode('IN')
  pincode: string;
}

class CreateTenantDto {
  @ApiProperty({
    example: 'www.example.com',
    description: 'Domain of the tenant',
  })
  @IsUrl()
  domain: string;

  @ApiProperty({
    example: 'telgu',
    description: 'Language of the tenant',
  })
  @IsString()
  language: string;

  @ApiProperty({
    example: '1234567890',
    description: 'RNI Number of the tenant',
  })
  @IsString()
  rniNumber: string;

  @ApiProperty({
    example: 'Arvind Jha',
    description: 'Publisher Name of the tenant',
  })
  @IsString()
  publisherName: string;

  @ApiProperty({
    example: '9876543210',
    description: 'Publisher Contact Number of the tenant',
  })
  @IsPhoneNumber('IN')
  publisherContactNumber: string;

  @ApiProperty({
    example: 'Prakash Jha',
    description: 'Chief Editor Name of the tenant',
  })
  @IsString()
  chiefEditorName: string;

  @ApiProperty({
    example: '9876543210',
    description: 'Contact Number of the tenant',
  })
  @IsPhoneNumber('IN')
  contactNumber: string;

  @ApiProperty({
    example: 'Telengana',
    description: 'Circulation State of the tenant',
  })
  @IsString()
  circulationState: string;

  @ApiProperty({
    example: {
      addressLine1: 'Flat No. 101',
      addressLine2: 'RGV Road',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500001',
    },
    description: 'Address of the tenant',
  })
  address: Address;
}
