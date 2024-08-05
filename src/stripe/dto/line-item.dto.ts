// src/payment/dto/line-item.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class LineItemDto {
  @ApiProperty({ example: 'Product Name', description: 'Name of the product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1899, description: 'Unit amount in cents' })
  @IsNumber()
  @IsNotEmpty()
  unitAmount: number;

  @ApiProperty({ example: 'https://example.com/product-image.jpg', description: 'Image URL of the product' })
  @IsString()
  productImageUrl?: string;

  @ApiProperty({ example: 2, description: 'The quantity of the product' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}