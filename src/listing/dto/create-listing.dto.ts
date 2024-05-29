export class CreateListingDto {
    VendorId: string;
    Listed: { CardId: string;  Price: number }[];
    Total: number;
    Sold: { CardId: string; CustomerId: string; Price: number }[];
  }