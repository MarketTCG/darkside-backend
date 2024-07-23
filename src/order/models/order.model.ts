// src/order/models/order.model.ts
import { Document } from 'mongoose';
import { User } from '@user/models/user.model';
import { Vendor } from 'src/vendor/models/vendor.model';
import { OrderItemDto } from '../dto/order-item.dto';

export class Order extends Document {
  user: User[];
  orderedItems: OrderItemDto
  quantity: number;
  status: string;
  purchaseDate: Date;
  stripePaymentId: string;
}
