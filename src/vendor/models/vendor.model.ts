// src/vendor/models/vendor.model.ts
import { Document } from 'mongoose';


export class InventoryItem {
  _id: string;
  VendorID: string;
  ProductID: string;
  Name: string;
  Price: number;
  Quantity: number;
  Quality: string;
  IsListed: boolean;
  ListingId: string;
}

export class Vendor extends Document {
  UserID: string;
  VendorName: string;
  VendorEmail: string;
  Inventory: InventoryItem[];
  VendorRating: number;
  PostagePrice: number;
}
