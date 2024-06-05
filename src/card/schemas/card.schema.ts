// src/card/schemas/card.schema.ts
import { Schema } from 'mongoose';

export const CardSchema = new Schema({
  VendorID: { type: String, required: true },
  ProductID: { type: String, required: true },
  Price: { type: Number, required: true },
}, { collection: 'cards' });

export default CardSchema;
