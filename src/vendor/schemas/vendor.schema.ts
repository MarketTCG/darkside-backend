// src/vendor/schemas/vendor.schema.ts
import { Schema } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

const InventoryItemSchema = new Schema({
  VendorID: { type: String, required: true },
  ProductID: { type: String, required: true },
  Price: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  Quality: { type: String, required: true }
});

const ListingItemSchema = new Schema({
  VendorID: { type: String, required: true },
  ProductID: { type: String, required: true },
  Price: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  Quality: { type: String, required: true },
  ListingId: { type: String, required: true }
});

export const VendorSchema = new Schema({
  UserID: { type: String, required: true, unique: true },
  Inventory: { type: [InventoryItemSchema], default: [], required: true },
  VendorRating: { type: Number, default: 0, required: true },
  Listings: { type: [ListingItemSchema], default: [], required: true },
}, { collection: 'vendors', versionKey: false });

VendorSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

export default VendorSchema;
