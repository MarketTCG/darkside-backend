// src/product/dto/listing.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ListingDetailsDto {
  @ApiProperty({ example: [], description: 'List of NM items' })
  @IsArray()
  @IsString({ each: true })
  NM: string[];

  @ApiProperty({ example: [], description: 'List of LP items' })
  @IsArray()
  @IsString({ each: true })
  LP: string[];

  @ApiProperty({ example: [], description: 'List of MP items' })
  @IsArray()
  @IsString({ each: true })
  MP: string[];

  @ApiProperty({ example: [], description: 'List of HP items' })
  @IsArray()
  @IsString({ each: true })
  HP: string[];

  @ApiProperty({ example: [], description: 'List of D items' })
  @IsArray()
  @IsString({ each: true })
  D: string[];
}

export class ListingDto {
  @ApiProperty({ example: '6641911de3052da3252bcdcd', description: 'The ID of the listing' })
  @IsString()
  _id: string;

  @ApiProperty({ example: 'Vendor123', description: 'The ID of the vendor' })
  @IsString()
  VendorId: string;

  @ApiProperty({ example: 100, description: 'The total number of items' })
  @IsNumber()
  Total: number;

  @ApiProperty({ example: ['sold1', 'sold2'], description: 'List of sold items' })
  @IsArray()
  @IsString({ each: true })
  Sold: string[];

  @ApiProperty({ type: ListingDetailsDto, description: 'Details of the listing' })
  @ValidateNested()
  @Type(() => ListingDetailsDto)
  Listing: ListingDetailsDto;
}
