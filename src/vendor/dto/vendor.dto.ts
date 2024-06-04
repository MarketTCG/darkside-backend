import { ApiProperty } from '@nestjs/swagger';

export class VendorDto {
  @ApiProperty({ example: '67890', description: 'The unique identifier for the customer' })
  CustomerID: string;

  @ApiProperty({ example: 'abcde', description: 'The unique identifier for the inventory' })
  InventoryID: string;

  @ApiProperty({ example: 4.5, description: 'The rating of the vendor' })
  VendorRating: number;
}
