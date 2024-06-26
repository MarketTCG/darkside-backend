import { Schema } from 'mongoose';

const ListingItemSchema = new Schema({
  VendorId: { type: String, required: true },
  Quantity: { type: Number, required: true },
  Price: { type: Number, required: true },
});

const ListingQualitySchema = new Schema({
  NM: { type: [ListingItemSchema], default: [] },
  LP: { type: [ListingItemSchema], default: [] },
  MP: { type: [ListingItemSchema], default: [] },
  HP: { type: [ListingItemSchema], default: [] },
  D: { type: [ListingItemSchema], default: [] },
});

const ListingSchema = new Schema({
  VendorId: { type: String, required: true },
  Total: { type: Number, default: 0 },
  Sold: { type: [String], default: [] },
  Listing: { type: ListingQualitySchema, default: () => ({}) },
}, { collection: 'Listings' });

export default ListingSchema;