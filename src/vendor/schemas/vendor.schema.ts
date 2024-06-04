// src/vendor/schemas/vendor.schema.ts
import { Schema } from 'mongoose';

const InventoryItemSchema = new Schema({
  _id: { type: String, required: true },
  productID: { type: String, required: true },
  price: { type: Number, required: true },
});

export const VendorSchema = new Schema({
  UserID: { type: String, required: true },
  Inventory: { type: [InventoryItemSchema], required: true },
  VendorRating: { type: Number, required: true },
}, { collection: 'vendors' });

export default VendorSchema;
