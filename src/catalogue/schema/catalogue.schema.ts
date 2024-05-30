// src/catalogue/schemas/catalogue.schema.ts
import { Schema } from 'mongoose';

export const CatalogueSchema = new Schema({
  set: String,
  number: String,
  name: String,
  type: String,
  aspects: [String],
  traits: [String],
  arenas: [String],
  cost: String,
  power: String,
  hp: String,
  frontText: String,
  doubleSided: Boolean,
  rarity: String,
  unique: Boolean,
  artist: String,
  frontArt: String,
  variantType: String,
  marketPrice: String,
}, { collection: 'catalogue' });

export default CatalogueSchema;
