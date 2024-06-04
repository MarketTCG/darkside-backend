// src/product/schemas/listing.schema.ts
import { Schema } from 'mongoose';

const ListingDetailsSchema = new Schema({
  NM: { type: [String], default: [] },
  LP: { type: [String], default: [] },
  MP: { type: [String], default: [] },
  HP: { type: [String], default: [] },
  D: { type: [String], default: [] },
});

export const ListingSchema = new Schema({
  _id: { type: String, required: true },
  VendorId: { type: String, required: true },
  Total: { type: Number, required: true },
  Sold: { type: [String], default: [] },
  Listing: { type: ListingDetailsSchema, required: true },
}, { collection: 'listings' });

export default ListingSchema;
