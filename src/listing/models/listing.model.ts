export class Listing {
    VendorId: string;
    Listed: {CardId: string, Price: Number}[];
    Total: number;
    Sold: {CardId: string, CustomerId: string, Price: Number}[];
  }