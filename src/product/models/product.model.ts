export class Listing {
  NM: string[];
  LP: string[];
  MP: string[];
  HP: string[];
  D: string[];
}

export class Product {
  Name: string;
  CardID: string;
  Price: number;
  Listing: Listing;
  Sales: string[];
  VariantType: boolean;
  artwork: string;
}
