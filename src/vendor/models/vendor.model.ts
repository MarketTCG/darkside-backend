// src/vendor/models/vendor.model.ts
import { Document } from 'mongoose';

export class InventoryItem {
  VendorID: string;
  ProductID: string;
  Price: number;
}

export class Vendor extends Document {
  UserID: string;
  Inventory: InventoryItem[];
  VendorRating: number;
}
