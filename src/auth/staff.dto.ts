import { Pic } from '@/drizzle/schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  IsUrl,
} from 'class-validator';
import { CreateUserDto } from './auth.dto';

export class Address {
  @IsNotEmpty()
  @IsString()
  addressLine1: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsPostalCode('IN') // Assuming pincode is 5 or 6 characters long
  pincode: string;
}

export class CreateTenantDto {
  @ApiProperty({
    example: 'https://kaburlu.com',
    description: 'domain name of the newspaper admin',
  })
  @IsUrl()
  public domain: string;

  @ApiProperty({
    example: 'telgu',
    description: 'language of the app',
  })
  public language: string;

  @ApiPropertyOptional({ example: '12345678', description: 'RNI number' })
  public rniNumber: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'name of the publisher',
  })
  @IsString()
  public publisherName?: string;

  @ApiPropertyOptional({
    example: '8888888888',
    description: '10 digit phone number of the publisher',
  })
  @IsPhoneNumber('IN')
  public publisherContactNumber?: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'name of the chief editor',
  })
  @IsString()
  public chiefEditorName?: string;

  @ApiPropertyOptional({
    example: '8888888888',
    description: '10 digit phone number of the newspaper admin',
  })
  @IsPhoneNumber('IN')
  public contactNumber?: string;

  @ApiPropertyOptional({
    example: 'Teleangana',
    description: 'state of the newspaper circulation',
  })
  @IsString()
  public circulationState?: string;

  @ApiProperty({
    example: {
      addressLine1: 'address line 1',
      addressLine2: 'address line 2',
      city: 'city',
      state: 'state',
      pincode: 'pincode',
    },
    description: 'address of the newspaper admin',
  })
  public address: Address;
}

export class CreateEditorDto extends CreateUserDto {
  @ApiProperty({ example: 'Editor John', description: 'name of the admin' })
  public fatherName: string;

  @ApiProperty({
    example: {
      url: 'https://kaburlu.com/id-image.png',
    },
    description: 'id image url of the newspaper reporter',
  })
  public idImage: Pic;

  @ApiProperty({
    example: {
      addressLine1: 'address line 1',
      addressLine2: 'address line 2',
      city: 'city',
      state: 'state',
      pincode: 'pincode',
    },
    description: 'address of the newspaper admin',
  })
  public address: Address;
}

export class CreateAdminDto extends CreateUserDto {
  @ApiProperty()
  public tenantInfo: CreateTenantDto;
}

class Reporter extends CreateUserDto {
  @ApiProperty({
    example: 'true',
    description: 'is news publish enabled or not',
  })
  public autoPublish: boolean;

  @ApiProperty({
    example: {
      url: 'https://kaburlu.com/id-image.png',
    },
    description: 'id image url of the newspaper reporter',
  })
  public idImage: Pic;

  @ApiProperty({
    example: {
      addressLine1: 'address line 1',
      addressLine2: 'address line 2',
      city: 'city',
      state: 'state',
      pincode: 'pincode',
    },
    description: 'address of the newspaper admin',
  })
  public address: Address;
}

class ReporterInfo {
  @ApiProperty({ example: 'Father John', description: 'name of the admin' })
  public fatherName: string;
}

class BeaureauInchargeInfo extends ReporterInfo {}

export class CreateBeaureauInchargeReporterDto extends Reporter {
  @ApiProperty()
  public info: BeaureauInchargeInfo;
}

class StaffReporterRank {
  @ApiProperty({ example: 'John', description: 'name of the admin' })
  public beureauInCharge: string;
}

class StaffReporterInfo extends ReporterInfo {
  rank: StaffReporterRank;
}

export class CreateStaffReporterDto extends Reporter {
  @ApiProperty()
  public info: StaffReporterInfo;
}

class RcReporterRank {
  @ApiProperty({ example: 'Beaureau John', description: 'name of the admin' })
  public beureauInCharge: string;

  @ApiProperty({ example: 'District John', description: 'name of the admin' })
  public staffReporter: string;
}

class RcReporterInfo extends ReporterInfo {
  rank: RcReporterRank;
}

export class CreateRcReporterDto extends Reporter {
  @ApiProperty()
  public info: RcReporterInfo;
}
//CreateMandalReporterDto

class MandalReporterRank {
  @ApiProperty({ example: 'Beaureau John', description: 'name of the admin' })
  public beureauInCharge: string;

  @ApiProperty({ example: 'District John', description: 'name of the admin' })
  public staffReporter: string;

  @ApiProperty({ example: 'John', description: 'name of the admin' })
  public rcInCharge: string;
}

class MandalReporterInfo extends ReporterInfo {
  rank: MandalReporterRank;
}

export class CreateMandalReporterDto extends Reporter {
  @ApiProperty()
  public info: MandalReporterInfo;
}
