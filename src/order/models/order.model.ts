// src/order/models/order.model.ts
import { Document } from 'mongoose';

export class Order extends Document {
  userId: string;
  vendorId: string;
  productId: string;
  quantity: number;
  status: string;
  purchaseDate: Date;
}
