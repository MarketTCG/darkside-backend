import { Schema } from 'mongoose';

const ListingItemSchema = new Schema({
  VendorId: { type: String, required: true },
  Quantity: { type: Number, required: true },
  Price: { type: Number, required: true },
  ListingId: { type: String, required: true }
});

const ListingQualitySchema = new Schema({
  NM: { type: [ListingItemSchema], default: [] },
  LP: { type: [ListingItemSchema], default: [] },
  MP: { type: [ListingItemSchema], default: [] },
  HP: { type: [ListingItemSchema], default: [] },
  D: { type: [ListingItemSchema], default: [] },
});

const ProductSchema = new Schema({
  Name: { type: String, required: true },
  CardID: { type: Schema.Types.ObjectId, required: true },
  Price: { type: Number, default: 0 },
  Listing: { type: ListingQualitySchema, default: () => ({}) },
  Sales: { type: [String], default: [] },
  VariantType: { type: Boolean, default: false },
  artwork: { type: String, required: true },
});

export default ProductSchema;