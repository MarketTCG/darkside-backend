// src/card/models/card.model.ts
import { Document } from 'mongoose';

export class Card extends Document {
  VendorID: string;
  ProductID: string;
  Price: number;
}
