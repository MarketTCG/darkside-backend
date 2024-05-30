// src/product/dto/product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ListingItemDto {
  @ApiProperty({ example: '12345', description: 'The ID of the listing item' })
  @IsString()
  _id: string;

  @ApiProperty({ example: '67890', description: 'The ID of the card' })
  @IsString()
  CardId: string;

  @ApiProperty({ example: 100, description: 'The price of the listing item' })
  @IsNumber()
  Price: number;
}

export class ProductDto {
  @ApiProperty({ example: 'Product Name', description: 'The name of the product' })
  @IsString()
  Name: string;

  @ApiProperty({ example: '12345', description: 'The ID of the card' })
  @IsString()
  CardID: string;

  @ApiProperty({ example: 100, description: 'The price of the product' })
  @IsNumber()
  Price: number;

  @ApiProperty({ type: [ListingItemDto], description: 'List of items in the listing' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ListingItemDto)
  Listing: ListingItemDto[];

  @ApiProperty({ example: ['sale1', 'sale2'], description: 'List of sales' })
  @IsArray()
  @IsString({ each: true })
  Sales: string[];

  @ApiProperty({ example: true, description: 'The variant type of the product' })
  @IsBoolean()
  VariantType: boolean;
}
