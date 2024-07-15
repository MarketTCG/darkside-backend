// src/stripe/dto/create-price.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PriceItemDto {
  @ApiProperty({ example: 'prod_1J2Y3Z4A5B6C7D8E9F0G', description: 'The product ID of the item' })
  @IsString()
  productId: string;

  @ApiProperty({ example: 1000, description: 'The unit amount of the item in cents' })
  @IsNumber()
  unitAmount: number;

  @ApiProperty({ example: 'usd', description: 'The currency of the item' })
  @IsString()
  currency: string;
}

export class CreatePriceDto {
  @ApiProperty({ type: [PriceItemDto], description: 'List of items with their product IDs, unit amounts, and currencies' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PriceItemDto)
  items: PriceItemDto[];
}
