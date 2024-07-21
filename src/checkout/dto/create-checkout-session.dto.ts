// src/checkout/dto/create-checkout-session.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductItemDto {
  @ApiProperty({ example: 'vendor_123', description: 'The vendor ID' })
  @IsString()
  vendorId: string;

  @ApiProperty({ example: 'vendor_123', description: 'The vendor ID' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'Product Name', description: 'The name of the product' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Product Description', description: 'The description of the product' })
  @IsString()
  description: string;

  @ApiProperty({ example: 1000, description: 'The unit amount of the product in cents' })
  @IsNumber()
  unitAmount: number;

  @ApiProperty({ example: 'aud', description: 'The currency of the product' })
  @IsString()
  currency: string;

  @ApiProperty({ example: 1, description: 'The quantity of the product' })
  @IsNumber()
  quantity: number;
}

export class CreateCheckoutSessionDto {
  @ApiProperty({ type: [ProductItemDto], description: 'List of products with their details' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductItemDto)
  items: ProductItemDto[];
}
