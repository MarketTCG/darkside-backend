import { Schema } from 'mongoose';

const ListingSchema = new Schema({
  NM: { type: [String], default: [] },
  LP: { type: [String], default: [] },
  MP: { type: [String], default: [] },
  HP: { type: [String], default: [] },
  D: { type: [String], default: [] },
});

export const ProductSchema = new Schema({
  Name: { type: String, required: true },
  CardID: { type: String, required: true },
  Price: { type: Number, required: true },
  Listing: { type: ListingSchema, required: true },
  Sales: { type: [String], default: [] },
  VariantType: { type: Boolean, required: true },
  artwork: { type: String, required: true },
}, { collection: 'products' });

export default ProductSchema;
