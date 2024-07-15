// src/stripe/dto/archive-price.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ArchivePriceDto {
  @ApiProperty({ example: 'price_1J2Y3Z4A5B6C7D8E9F0G', description: 'The price ID to be archived' })
  @IsString()
  priceId: string;
}
