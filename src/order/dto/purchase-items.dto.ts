import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class PurchaseItemsDto {

  @ApiProperty({ example: '2f509496-cad4-4f25-b039-dd23cbeb91cb', description: 'the id of the listing contained in the products / vendors listings array' })
  @IsString()
  listingId: string;

  @ApiProperty({ example: 2, description: 'The quantity of the product' })
  @IsNumber()
  quantity: number;
}
