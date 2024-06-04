// src/product/models/listing.model.ts
import { Document } from 'mongoose';

export class ListingDetails {
  NM: string[];
  LP: string[];
  MP: string[];
  HP: string[];
  D: string[];
}

export class Listing extends Document {
  _id: string;
  VendorId: string;
  Total: number;
  Sold: string[];
  Listing: ListingDetails;
}
