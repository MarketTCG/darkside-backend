export class Listing {
    VendorId: string;
    Listed: {CardId: string, VendorId: string, Price: Number}[];
    Total: number;
    Sold: {CardId: string, CustomerId: string, Price: Number}[];
  }