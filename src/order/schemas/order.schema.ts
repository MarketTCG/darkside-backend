// src/order/schemas/order.schema.ts
import { Schema } from 'mongoose';

const OrderSchema = new Schema({
  userId: { type: String, required: true },
  listingId: { type: String, required: true },
  productId: { type: String, required: true },
  vendorId: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  paymentIntentId: { type: String, required: true },
}, { collection: 'orders' });

export default OrderSchema;
