export class Product {
  Name: string;
  CardID: string;
  Price: number;
  Listing: {_id: String, CardId: string, Price: Number}[];;
  Sales: string[];
  VariantType: boolean;

}