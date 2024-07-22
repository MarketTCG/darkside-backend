// src/checkout/dto/create-checkout-session.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductItemDto {
  @ApiProperty({ example: 'vendor_123', description: 'The vendor ID' })
  @IsString()
  vendorId: string;

  @ApiProperty({ example: 'user ID', description: 'The user ID' })
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
  @ApiProperty({ example: '666709dbaeb7ab3dd13b9977', description: 'the id of the user in user db' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'listing_123', description: 'The listing ID' })
  @IsString()
  listingId: string;

  @ApiProperty({ example: 2, description: 'The quantity of the product' })
  @IsNumber()
  quantity: number;
}
