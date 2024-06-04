// src/vendor/models/vendor.model.ts
import { Document } from 'mongoose';

export class InventoryItem {
  _id: string;
  productID: string;
  price: number;
}

export class Vendor extends Document {
  UserID: string;
  Inventory: InventoryItem[];
  VendorRating: number;
}
