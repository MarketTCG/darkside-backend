// src/order/models/order.model.ts
import { Document } from 'mongoose';
import { User } from '@user/models/user.model';
import { Vendor } from 'src/vendor/models/vendor.model';

export class Order extends Document {
  user: User[];
  vendor: Vendor[];
  listingId: string;
  productId: string;
  quantity: number;
  status: string;
  purchaseDate: Date;
  stripePaymentId: string;
}
