// src/order/models/order.model.ts
import { Document } from 'mongoose';


export class Order extends Document {
  user: string;
  vendor: string;
  items: string;
  listingId: string;
  productId: string;
  vendorId: string;
  quantity: number;
  purchaseStatus: string;
  purchaseDate: Date;
  stripePaymentId: string;
}
