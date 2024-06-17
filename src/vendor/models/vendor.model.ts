// src/vendor/models/vendor.model.ts
import { Document } from 'mongoose';

export class InventoryItem {
  _id: string;
  VendorID: string;
  ProductID: string;
  Price: number;
  Quantity: number;
  Quality: string;
}

export class Vendor extends Document {
  UserID: string;
  Inventory: InventoryItem[];
  VendorRating: number;
}
