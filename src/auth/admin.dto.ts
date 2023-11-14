import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Pic, type Address } from 'src/drizzle/schema';
import { CreateUserDto } from './auth.dto';

export class CreateTenantDto {
  @ApiProperty({
    example: 'https://kaburlu.com',
    description: 'domain name of the newspaper admin',
  })
  public domain: string;

  @ApiProperty({
    example: 'telgu',
    description: 'language of the app',
  })
  public language: string;

  @ApiPropertyOptional({ example: '****', description: 'RNI number' })
  public rniNumber: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'name of the publisher',
  })
  public publisherName?: string;

  @ApiPropertyOptional({
    example: '8888888888',
    description: '10 digit phone number of the publisher',
  })
  public publisherContactNumber?: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'name of the chief editor',
  })
  public chiefEditorName?: string;

  @ApiPropertyOptional({
    example: '8888888888',
    description: '10 digit phone number of the newspaper admin',
  })
  public contactNumber?: string;

  @ApiPropertyOptional({
    example: 'Teleangana',
    description: 'state of the newspaper circulation',
  })
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

export class CreateEditorDto extends CreateUserDto {}

export class CreateAdminDto extends CreateUserDto {
  @ApiProperty()
  public tenantInfo: CreateTenantDto;
}

class ReporterRank {
  @ApiProperty({ example: 'John', description: 'name of the admin' })
  public beureauIncharge: string;

  @ApiProperty({ example: 'John', description: 'name of the admin' })
  public districtIncharge: string;

  @ApiProperty({ example: 'John', description: 'name of the admin' })
  public mandalIncharge: string;

  @ApiProperty({ example: 'John', description: 'name of the admin' })
  public divisionIncharge: string;
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
