export class Listing {
    VendorId: string;
    Listed: {_id: string, CardId: string, Price: Number}[];
    Total: number;
    Sold: {CardId: string, CustomerId: string, Price: Number}[];
  }