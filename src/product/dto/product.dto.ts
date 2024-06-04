// src/product/dto/product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ListingDto {
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

  @ApiProperty({ type: ListingDto, description: 'List of items in the listing' })
  @ValidateNested()
  @Type(() => ListingDto)
  Listing: ListingDto;

  @ApiProperty({ example: ['sale1', 'sale2'], description: 'List of sales' })
  @IsArray()
  @IsString({ each: true })
  Sales: string[];

  @ApiProperty({ example: true, description: 'The variant type of the product' })
  @IsBoolean()
  VariantType: boolean;

  @ApiProperty({ example: 'artwork_url', description: 'The artwork of the product' })
  @IsString()
  artwork: string;
}
