// src/orders/dto/create-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @ApiProperty({ example: 'product_123', description: 'The product ID' })
  @IsString()
  productId: string;

  @ApiProperty({ example: 2, description: 'The quantity of the product' })
  @IsString()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'user_123', description: 'The user ID' })
  @IsString()
  user: string;

  @ApiProperty({ example: 'vendor_123', description: 'The vendor ID' })
  @IsString()
  vendor: string;

  @ApiProperty({ example: 'product_123', description: 'The product ID' })
  @IsString()
  productId: string;

  @ApiProperty({ type: [OrderItemDto], description: 'List of order items' })
  @IsArray()
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({ example: 'pending', description: 'The status of the order' })
  @IsString()
  status: string;

  @ApiProperty({ example: new Date(), description: 'The purchase date of the order' })
  @IsDate()
  @Type(() => Date)
  purchaseDate: Date;

  @ApiProperty({ example: 'pi_1J2Y3Z4A5B6C7D8E9F0G', description: 'The Stripe payment ID' })
  @IsString()
  stripePaymentId: string;
}
