// src/listings/dto/purchase-item.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PurchaseItemDto {
  @ApiProperty({ example: '34451fdb-2396-4bab-9f92-2689eb6114d5', description: 'The ID of the listing' })
  @IsString()
  listingId: string;

  @ApiProperty({ example: 'user123', description: 'The ID of the user making the purchase' })
  @IsString()
  userId: string;
}
