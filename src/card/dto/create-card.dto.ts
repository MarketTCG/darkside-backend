// src/card/dto/create-card.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({ example: '665d2c498805000ce934043d', description: 'The ID of the vendor' })
  @IsString()
  VendorID: string;

  @ApiProperty({ example: '663104c3cb4bab0dae0be268', description: 'The ID of the product' })
  @IsString()
  ProductID: string;

  @ApiProperty({ example: 100, description: 'The price of the product' })
  @IsNumber()
  Price: number;
}
