// src/order/models/order.model.ts
import { Document } from 'mongoose';

export class Order extends Document {
  userId: string;
  listingId: string;
  productId: string;
  vendorId: string;
  quantity: number;
  status: string;
  purchaseDate: Date;
  paymentIntentId: string;
}
