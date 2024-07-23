// src/order/schemas/order.schema.ts
import { Schema, Types } from 'mongoose';
import { UserSchema } from '@user/schemas/user.schema';
import OrderItemSchema from './order-item.schema';

const OrderSchema = new Schema({
  user: { type: [UserSchema], required: true },
  orderedItems: { type: [OrderItemSchema], required: true },
  status: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  stripePaymentId: { type: String, required: true },
}, { collection: 'orders' });

export default OrderSchema;
