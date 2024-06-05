// src/vendor/schemas/vendor.schema.ts
import { Schema } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

const InventoryItemSchema = new Schema({
  VendorID: { type: String, required: true },
  ProductID: { type: String, required: true },
  Price: { type: Number, required: true },
});

export const VendorSchema = new Schema({
  UserID: { type: String, required: true, unique: true },
  Inventory: { type: [InventoryItemSchema], required: true },
  VendorRating: { type: Number, required: true },
}, { collection: 'vendors', versionKey: false }, );

VendorSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

export default VendorSchema;
