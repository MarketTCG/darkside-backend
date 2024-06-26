// src/listings/dto/update-price.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UpdatePriceDto {
  @ApiProperty({ example: '34451fdb-2396-4bab-9f92-2689eb6114d5', description: 'The ID of the listing' })
  @IsString()
  _id: string;

  @ApiProperty({ example: 100, description: 'The new price' })
  @IsNumber()
  Price: number;
}
