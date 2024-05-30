// src/listing/dto/create-listing.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ListedItemDto {
  @ApiProperty({ example: '12345', description: 'The ID of the card' })
  @IsString()
  CardId: string;

  @ApiProperty({ example: 100, description: 'The price of the listed item' })
  @IsNumber()
  Price: number;
}

class SoldItemDto {
  @ApiProperty({ example: '12345', description: 'The ID of the card' })
  @IsString()
  CardId: string;

  @ApiProperty({ example: '54321', description: 'The ID of the customer' })
  @IsString()
  CustomerId: string;

  @ApiProperty({ example: 100, description: 'The price of the sold item' })
  @IsNumber()
  Price: number;
}

export class CreateListingDto {
  @ApiProperty({ example: 'vendor123', description: 'The ID of the vendor' })
  @IsString()
  VendorId: string;

  @ApiProperty({ type: [ListedItemDto], description: 'List of items listed' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ListedItemDto)
  Listed: ListedItemDto[];

  @ApiProperty({ example: 200, description: 'Total amount' })
  @IsNumber()
  Total: number;

  @ApiProperty({ type: [SoldItemDto], description: 'List of items sold' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SoldItemDto)
  Sold: SoldItemDto[];
}
