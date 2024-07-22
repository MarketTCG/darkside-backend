// src/order/schemas/order.schema.ts
import { Schema, Types } from 'mongoose';
import { UserSchema } from '@user/schemas/user.schema';
import { VendorSchema } from '../../vendor/schemas/vendor.schema'

const OrderSchema = new Schema({
  user: { type: [UserSchema], required: true },
  vendor: {type: [VendorSchema], required: true},
  listingId: { type: String, required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  stripePaymentId: { type: String, required: true },
}, { collection: 'orders' });

export default OrderSchema;
