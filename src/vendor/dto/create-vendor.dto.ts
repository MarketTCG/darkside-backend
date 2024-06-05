// src/vendor/dto/create-vendor.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateVendorDto {
  @ApiProperty({ example: 5, description: 'The rating of the vendor' })
  @IsNumber()
  VendorRating: number;
}
