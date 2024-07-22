// src/checkout/dto/create-checkout-session.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';


class CheckoutItemDto {
  @ApiProperty({ example: 'listing_123', description: 'The listing ID' })
  @IsString()
  listingId: string;

  @ApiProperty({ example: 2, description: 'The quantity of the product' })
  @IsNumber()
  quantity: number;
}

export class CreateCheckoutSessionDto {
  @ApiProperty({ example: '666709dbaeb7ab3dd13b9977', description: 'the id of the user in user db' })
  @IsString()
  userId: string;

  @ApiProperty({ type: [CheckoutItemDto], description: 'Array of listing IDs and quantities' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items: CheckoutItemDto[];
}
