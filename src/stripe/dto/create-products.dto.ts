// src/stripe/dto/create-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductItemDto {
  @ApiProperty({ example: 'Product Name', description: 'The name of the product' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Product Description', description: 'The description of the product' })
  @IsString()
  description: string;

  @ApiProperty({ example: 1000, description: 'The unit amount of the product in cents' })
  @IsNumber()
  unitAmount: number;

  @ApiProperty({ example: 'usd', description: 'The currency of the product' })
  @IsString()
  currency: string;
}

export class CreateProductDto {
  @ApiProperty({ type: [ProductItemDto], description: 'List of products with their details' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductItemDto)
  items: ProductItemDto[];
}
