export class Listing {
    VendorId: string;
    Listed: {_id: string, productId: string, Price: Number}[];
    Total: number;
    Sold: {CardId: string, CustomerId: string, Price: Number}[];
  }