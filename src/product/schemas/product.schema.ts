import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  Name: String,
  CardID: String,
  Price: Number,
  Listing: [String],
  Sales: [String],
  VariantType: String
}, {collection:'products'});

export default ProductSchema;