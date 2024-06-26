// src/product/dto/add-cards.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CardDto {
  @ApiProperty({ example: 'vendor1', description: 'The ID of the vendor' })
  @IsString()
  VendorId: string;

  @ApiProperty({ example: 10, description: 'The quantity of the product' })
  @IsNumber()
  Quantity: number;

  @ApiProperty({ example: 100, description: 'The price of the product' })
  @IsNumber()
  Price: number;

  @ApiProperty({ example: 'NM', description: 'The quality of the product' })
  @IsString()
  Quality: string;
}

class ProductCardsDto {
  @ApiProperty({ example: 'productId1', description: 'The ID of the product' })
  @IsString()
  productId: string;

  @ApiProperty({ type: [CardDto], description: 'Array of cards to add' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardDto)
  cards: CardDto[];
}

export class AddCardsDto {
  @ApiProperty({ type: [ProductCardsDto], description: 'Array of product IDs with their respective cards' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductCardsDto)
  products: ProductCardsDto[];
}
