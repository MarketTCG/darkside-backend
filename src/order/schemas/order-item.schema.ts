// src/order/schemas/order-item.schema.ts
import { Schema } from 'mongoose';

const ProductListingSchema = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const VendorListingSchema = new Schema({
  vendorId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const ListingsSchema = new Schema({
  productListing: { type: ProductListingSchema, required: true },
  vendorListing: { type: VendorListingSchema, required: true },
});

const OrderItemSchema = new Schema({
  listings: { type: ListingsSchema, required: true },
  quantity: { type: Number, required: true },
});

export default OrderItemSchema;
