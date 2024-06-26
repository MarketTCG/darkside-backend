// src/listings/dto/update-quantity.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UpdateQuantityDto {
  @ApiProperty({ example: '34451fdb-2396-4bab-9f92-2689eb6114d5', description: 'The ID of the listing' })
  @IsString()
  _id: string;

  @ApiProperty({ example: 20, description: 'The new quantity' })
  @IsNumber()
  Quantity: number;
}
