// src/vendor/dto/listing.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class ListingDto {
  @ApiProperty({ example: 'vendor1', description: 'The ID of the vendor' })
  @IsString()
  VendorId: string;

  @ApiProperty({ example: 10, description: 'The quantity of the product' })
  @IsNumber()
  Quantity: number;

  @ApiProperty({ example: 100, description: 'The price of the product' })
  @IsNumber()
  Price: number;

  @ApiProperty({ example: 'NM', description: 'The quality of the product' })
  @IsString()
  Quality: string;
}
