import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  Name: String,
  CardID: String,
  Price: Number,
  Listing: [{ _id: String, CardId: String, Price: Number }],
  Sales: [String],
  VariantType: String
}, {collection:'products'});

export default ProductSchema;