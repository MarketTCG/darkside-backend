// src/order/dto/create-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';
import { User } from '@user/models/user.model';
import { Vendor } from 'src/vendor/models/vendor.model';

export class CreateOrderDto {
  @ApiProperty({ type: [User], description: 'List of users' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => User)
  user: User[];

  @ApiProperty({ type: [OrderItemDto], description: 'List of order items' })
  @IsArray()
  @ValidateNested({ each: true })
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
